from PIL import Image
import sys


img = Image.open(sys.argv[1])
img = img.convert("RGBA")

pixdata = img.load()

width, height = img.size
colors = {}
for y in range(height):
    for x in range(width):


        colors[str(pixdata[x, y])] = 0
for y in range(height):
    for x in range(width):
        print('Remove? ')
        print(pixdata[x, y])

        colors[str(pixdata[x, y])] += 1

        if pixdata[x, y] != (33, 97, 19, 255):
            pixdata[x, y] = (255, 255, 255, 0)

print(colors)

img.save(sys.argv[1], "PNG")
