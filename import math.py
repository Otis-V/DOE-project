import math
import numpy as np
from scipy.interpolate import CubicSpline
from scipy import integrate
import csv


def multiply(x, y):
    z = []
    for i in range(len(x)):
        z.append(x[i] * y[i])
    return z


def findQ(x, y):
    if len(x) != len(y):
        raise Exception("x en y moeten dezelfde lengte hebben")

    # Fit cubic spline and determine derivatives
    f0 = CubicSpline(x, y)
    f1 = f0.derivative(1)
    f2 = f0.derivative(2)

    # Evaluate spline and derivatives
    F0 = np.array(y)
    F1 = f1(x)
    F2 = f2(x)

    # Functions to be integrated
    A = multiply(F1, F1)
    B = multiply(F1, F0)
    C = multiply(F1, F0)
    D = multiply(F0, F0)
    Y1 = multiply(F1, F2)
    Y2 = multiply(F0, F2)

    # Integrals
    n = len(x) - 1

    a = integrate.cumulative_trapezoid(A, x, initial=0.0)[n]
    b = integrate.cumulative_trapezoid(B, x, initial=0.0)[n]
    c = integrate.cumulative_trapezoid(C, x, initial=0.0)[n]
    d = integrate.cumulative_trapezoid(D, x, initial=0.0)[n]
    y1 = integrate.cumulative_trapezoid(Y1, x, initial=0.0)[n]
    y2 = integrate.cumulative_trapezoid(Y2, x, initial=0.0)[n]

    # Solve linear system
    M1 = np.array([[a, b], [c, d]])
    M2 = np.array([y1, y2])
    K = np.linalg.solve(M1, M2)

    c1 = -float(K[0])
    c2 = -float(K[1])

    Q = math.sqrt(c2) / c1
    return Q


# -------------------------------------------------
# NIEUW DEEL: Autocorrelation.csv → x- en y-lijsten
# -------------------------------------------------

x = []
y = []

with open("Autocorrelation.csv", newline="") as f:
    reader = csv.DictReader(f)
    for row in reader:
        x.append(float(row["Time shift (s)"]))
        y.append(float(row["Autocorrelation of sum"]))

# -------------------------------------------------
# Q berekenen
# -------------------------------------------------

Q = findQ(x, y)
print("Q =", Q)
