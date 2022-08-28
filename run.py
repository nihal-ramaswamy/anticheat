import psutil

"""
    Gets all the open processes on a machine
    Works on Unix machines
"""
def getOpenProcesses():
    return [i.name().lower() for i in psutil.process_iter()]


if __name__=="__main__":
    print(getOpenProcesses())

