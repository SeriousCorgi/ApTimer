"""
Distance and Time steps
"""


class DisTime:
    def __init__(self, data):
        self.dx = data["dx"]
        self.dt = data["dt"]
        self.iteration = data["iteration"]

    def show_input(self):
        return {"dx": self.dx, "dt": self.dt, "iteration": self.iteration}
