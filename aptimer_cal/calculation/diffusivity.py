"""
Calculate diffusivity
"""
import math


class DiffFunc:
    def __init__(self, data):
        self.temp = data['temp']    # Temperature in Celsius degree
        self.tilt = data['tilt']    # Tilt of traverse from the c-axis

    def diffusivity(self):
        tilt = math.radians(self.tilt)
        DCl = 5.1 * 10 ** (-5) * math.exp(-290000 / (8.314 * (self.temp + 273.15))) * math.pow(math.cos(tilt), 2)
        DF = 9 * 10 ** (-5) * math.exp(-288000 / (8.314 * (self.temp + 273.15))) * math.pow(math.cos(tilt), 2)
        DOH = 1.7 * 10 ** (-2) * math.exp(-397000 / (8.314 * (self.temp + 273.15))) * math.pow(math.cos(tilt), 2)
        return {"D(CL)": DCl, "D(F)": DF, "D(OH)": DOH}
