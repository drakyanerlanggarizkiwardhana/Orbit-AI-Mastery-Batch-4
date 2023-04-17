import matplotlib.pyplot as plt
from IPython import display

plt.ion()

def plot(n_games, loss):
    display.clear_output(wait=True)
    display.display(plt.gcf())
    plt.clf()
    plt.title('Training...')
    plt.xlabel('Number of Games')
    plt.ylabel('Loss')
    # plt.plot(n_games)
    plt.plot(loss)
    plt.ylim(ymin=0)
    # plt.text(len(n_games)-1, n_games[-1], str(n_games[-1]))
    plt.text(len(loss)-1, loss[-1], str(loss[-1]))
    plt.show(block=False)
    plt.pause(.1)