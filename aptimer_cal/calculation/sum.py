"""
    Calculation
"""


class SumFunc:
    def __init__(self, data):
        self.a = data['a']
        self.b = data['b']

    def sum(self):
        return self.a - self.b
