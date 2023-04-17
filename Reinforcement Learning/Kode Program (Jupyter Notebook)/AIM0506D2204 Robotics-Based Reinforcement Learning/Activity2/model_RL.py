import torch

import torch.nn as nn
import torch.optim as optim
import torch.nn.functional as F
import os

class layer_Qnet(nn.Module):
    def __init__(self, input_size, hidden_size, output_size):
        super().__init__()
        self.l1 = torch.nn.Linear(input_size,hidden_size)
        self.relu1 = torch.nn.ReLU()
        self.l3 = torch.nn.Linear(hidden_size,output_size)

    def forward(self,x):
        output = self.l1(x)
        output = self.relu1(output)
        output = self.l3(output) 
        
        return output


    def save(self, file_name='model.pth'):
        model_folder_path = './model'
        if not os.path.exists(model_folder_path):
            os.makedirs(model_folder_path)

        file_name = os.path.join(model_folder_path,file_name)
        torch.save(self.state_dict(),file_name)



class Trainer():
    def __init__(self, model, LEARNING_RATE, gamma):
        self.lr = LEARNING_RATE
        self.gamma = gamma
        self.model = model
        self.optimizer = optim.Adam(params =  model.parameters(), lr=LEARNING_RATE)
        self.loss = nn.MSELoss()
    
    def train_step(self,state, action, reward, next_state,done):
        state = torch.tensor(state,dtype=torch.float)
        next_state = torch.tensor(next_state, dtype=torch.float)
        action = torch.tensor(action, dtype=torch.long)
        reward = torch.tensor(reward, dtype=torch.float)

        if len(state.shape) == 1:
            # (1, x)
            state = torch.unsqueeze(state, 0)
            next_state = torch.unsqueeze(next_state, 0)
            action = torch.unsqueeze(action, 0)
            reward = torch.unsqueeze(reward, 0)
            done = (done, )

        pred = self.model(state)

        target = pred.clone()
        for idx in range(len(done)):
            Q_new = reward[idx]
            if not done[idx]:
                #BELLMAN Equation
                Q_new = reward[idx] + self.gamma * torch.max(self.model(next_state[idx]))
                
            target[idx][torch.argmax(action[idx]).item()]= Q_new

        
        self.optimizer.zero_grad()
        loss = self.loss(target,pred)
        loss.backward()

        self.optimizer.step()

        return loss.item()
        
