#https://towardsdatascience.com/getting-started-with-openai-gym-d2ac911f5cbc

import gym
envs = gym.envs.registry.all()
print(envs)
print('Total envs available:', len(envs))

import gym
env = gym.make('CartPole-v0') #bisa diganti-ganti environmentnya
# Uncomment following line to save video of our Agent interacting in this environment
# This can be used for debugging and studying how our agent is performing
# env = gym.wrappers.Monitor(env, './video/', force = True)
t = 0
while t < 1000:
   t += 1
   observation = env.reset()
   print(observation)

   # sample a random action from the list of available actions
   action = env.action_space.sample()
   observation, reward, done, info = env.step(action)

   # print the new state
   env.render()
   if done:
    print("Episode finished after {} timesteps".format(t+1))
    break
env.close()