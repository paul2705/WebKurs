from PIL import Image
from pylab import *
import ImgTools

ImgList=ImgTools.GetImgList(".");
for i in ImgList:
	Img=Image.open(i);
	print(i);
	Img.thumbnail((1000,1000));
	Img.save(i);
