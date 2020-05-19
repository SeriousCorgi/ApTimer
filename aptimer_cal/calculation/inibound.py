"""
Initial and Boundary conditions
"""


class IniBound:
    def __init__(self, data):
        self.XCl_ini = data["xcl_ini"]
        self.XF_ini = data["xf_ini"]
        self.XOH_ini = data["xoh_ini"]
        self.XCl_left = data["xcl_left"]
        self.XF_left = data["xf_left"]
        self.XOH_left = data["xoh_left"]
        self.XCl_right = data["xcl_right"]
        self.XF_right = data["xf_right"]
        self.XOH_right = data["xoh_right"]

    def show_input(self):
        return {"X(Cl)": [self.XCl_ini, self.XCl_left, self.XCl_right],
                "X(F)": [self.XF_ini, self.XF_left, self.XF_right],
                "X(OH)": [self.XOH_ini, self.XOH_left, self.XOH_right]}
