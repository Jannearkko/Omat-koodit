# There were no such "weight-height.csv"-file anywhere in Viope so I created my own with 20 students.

import numpy as np
from matplotlib import pyplot as plt

data = np.genfromtxt('weight-height.csv', delimiter=',', skip_header=1, dtype=None, encoding='utf-8', names=['Name', 'Length', 'Weight'])

length = data['Length']
weight = data['Weight']

length_cm = length * 2.54  # 1 inch = 2.54 cm
weight_kg = weight * 0.453592  # 1 pound = 0.453592 kg

# Calculate means, medians, standard deviations, and variances
mean_length = np.mean(length_cm)
median_length = np.median(length_cm)
std_dev_length = np.std(length_cm)
variance_length = np.var(length_cm)

mean_weight = np.mean(weight_kg)
median_weight = np.median(weight_kg)
std_dev_weight = np.std(weight_kg)
variance_weight = np.var(weight_kg)

# Results
print("Lengths:")
print(f"Mean: {mean_length:.2f} cm")
print(f"Median: {median_length:.2f} cm")
print(f"Standard Deviation: {std_dev_length:.2f} cm")
print(f"Variance: {variance_length:.2f} cm^2")
print()
print("Weights:")
print(f"Mean: {mean_weight:.2f} kg")
print(f"Median: {median_weight:.2f} kg")
print(f"Standard Deviation: {std_dev_weight:.2f} kg")
print(f"Variance: {variance_weight:.2f} kg^2")

# Histogram

plt.hist(length,bins = [50,55,60,65,70,75,80])
plt.title("Histogram of Lengths")
plt.show()


