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
        dcl = 5.1 * 10 ** (-5) * math.exp(-290000 / (8.314 * (self.temp + 273.15))) * math.pow(math.cos(tilt), 2)
        df = 9 * 10 ** (-5) * math.exp(-288000 / (8.314 * (self.temp + 273.15))) * math.pow(math.cos(tilt), 2)
        doh = 1.7 * 10 ** (-2) * math.exp(-397000 / (8.314 * (self.temp + 273.15))) * math.pow(math.cos(tilt), 2)

        DCl = str(dcl).split('e')
        DCl = 'e'.join([str("%.2f" % round(float(DCl[0]), 2)), DCl[1]])
        DF = str(df).split('e')
        DF = 'e'.join([str("%.2f" % round(float(DF[0]), 2)), DF[1]])
        DOH = str(doh).split('e')
        DOH = 'e'.join([str("%.2f" % round(float(DOH[0]), 2)), DOH[1]])
        return {"D(CL)": DCl,
                "D(F)": DF,
                "D(OH)": DOH,
                "dcl": dcl,
                "df": df,
                "doh": doh,
                }
