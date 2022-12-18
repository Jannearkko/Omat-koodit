import tkinter
from tkinter.constants import CENTER, DISABLED, HIDDEN, LEFT, NONE, NORMAL, TOP
from tkinter import OptionMenu, StringVar, messagebox
import random
import string
import os
import sys
import subprocess
from sys import exit #import exit, jotta .exe tiedosto toimii oikein.

# luo relatiivinen polku sovelluksen ikonille ja/tai kuville, jotta toimii .exe tiedostossa
def resource_path(relative_path):
    base_path = getattr(sys, '_MEIPASS', os.path.dirname(os.path.abspath(__file__)))
    return os.path.join(base_path, relative_path)
# ikonin sijainti
image_path = resource_path("icon.ico")

# luodaan ikkuna
w = tkinter.Tk() 
w.title("Password-maker PRO 3000")
w.configure(width=500, height=300)
w.configure(bg="lightblue")
w.iconbitmap(image_path) # Ikoni on CC -lisenssin alainen
w.resizable(False, False)

def hint(): # vinkkiruutu
    messagebox.showinfo("Hint","This generator scans your machine for hard-drives and lists them on the dropdown menu. Choose the one you wish to generate the password to. It is preferred to choose a thumbdrive.\n\nIf you can't see your thumbdrive in the menu, exit the program, ensure you have a thumbdrive inserted into a USB slot and start the program again.\n\nIMPORTANT!:\nIf you are not logged in as administrator or your user account has unsufficient permissions to create a file to a system drive, the generator can't create a new file to drive C:!")

def info(): # inforuutu
    messagebox.showinfo("Info", "Type in the service or platform you would like to generate a password to. Don't be spesific! Prefer keywords that are short and easy-to-understand by you.\n\nFor password length, type the desired length in numbers! The longer the password, the more secure it is!\n\nThis generator creates random password of chosen length from all the ASCII letters in upper- and lower case and from all the digits. Symbols are not used to ensure password usability. If a service or platform requires one or more symbols in the password, you can simply add them yourself and update the text-file accordingly.\n\nThe random password is generated, with it's corresponding service, to a file called 'password.txt' and it will be created or updated to the hard-drive of your choosing. Preferably to a thumbdrive.\n\nIt is suggested that you cut and paste the generated password to another text-file, print the text-file or type it down on a piece of paper. After that, remove the 'password.txt' -file completely to ensure security!")

def invalid_input_clear(): # funktio palauttamaan virheellisen syötteen aiheuttama viesti
    L3.place(x=158, y=1000)
    L4.place(x=158, y=1000)
    L4.config(bg="lightblue")
    L5.place(x=158, y=1000)
    L5.config(bg="lightblue")
    e2.config(bg="white")
    
def restart(): # jos käyttäjä haluaa luoda uuden salasanan uudelle palvelulle
    w.destroy() # sulje nykyinen ikkuna ja luo uusi
    subprocess.call(sys.executable + ' "' + os.path.realpath(__file__) + '"') 

def pw_created(): # salasanan luonti onnistunut + muokkaa ikkunaa
    L_info.destroy()
    L1.destroy()
    L2.config(text="Password generated!")
    L2.place(x=200, y=133)
    e1.destroy()
    e2.destroy()
    b1.config(text="Create a new password?", command=restart)
    b2.destroy()
    O1.destroy()
    b3.destroy()
    b4 = tkinter.Button(w, text="Close", command=exit) # luo uusi painike Close kun salasana luotu onnistuneesti
    b4.pack()
    b4.place(x=238, y=240)
    def on_enter_4(e): # hover funktiot painikkeelle b4
        b4['background'] = 'lightgrey'
    def on_leave_4(e):  
        b4['background'] = 'SystemButtonFace'
    b4.bind("<Enter>", on_enter_4)
    b4.bind("<Leave>", on_leave_4)

def password(): # luodaan salasana
    # Käytä kaikkia ASCII kirjaimia ja numeroita
    lower = string.ascii_lowercase
    upper = string.ascii_uppercase
    numbers = string.digits
    all = lower + upper + numbers

    # Kysy käyttäjältä salasanan pituus 
    def length():
        L = e2.get() # hae input ohjelman syöteikkunasta
        try:
            return int(L) # muunna syöte luvuksi
        except ValueError or TypeError: # jos ei pysty muuttamaan luvuksi niin joko anna virheilmoitus tai älä tee mitään
            if TypeError: # jos typeError niin tuo virheilmoitus ikkunaan ja muuta syötealueen väriä
                L3.place(x=158, y=230)
                e2.config(bg="red")
                L3.after(4000, invalid_input_clear) # poista virheilmoitus 4 sekunnin kuluttua
            else:
                return None

    password = "".join(random.sample(all, length())) # Luo salasana
    S = e1.get() # tuo palvelu input entry 1

    # Kirjoita luotu salasana ja palvelu tiedostoon
    try:
        drive = var1.get() #hae input dropdown menun muuttujasta
        f = open(drive+"/password.txt", "a")
        f.write(S + " " + password + "\n") # kirjoita tiedostolle palvelu ja luotu salasana
        f.close()

        pw_created() # kutsu pw_created funktiota jos salasana luotu onnistuneesti
    except FileNotFoundError: # jos tietostosijaintia ei valittu
        L4.place(x=122, y=230)
        L4.config(bg="red")
        L4.after(6000, invalid_input_clear) # poista virheilmoitus 6 sekunnin kuluttua
    except PermissionError: # jos ei ole oikeutta kirjoittaa levylle.
        L5.place(x=155, y=230)
        L5.config(bg="red")
        L5.after(5000, invalid_input_clear)

# hover funktiot painikkeille
def on_enter(e):
    b1['background'] = 'lightgrey'
def on_leave(e):
    b1['background'] = 'SystemButtonFace'
def on_enter_2(e):
    b2['background'] = 'lightgrey'
def on_leave_2(e):
    b2['background'] = 'SystemButtonFace'
def on_enter_3(e):
    b3['background'] = 'lightgrey'
    b3['borderwidth'] = 1
def on_leave_3(e):
    b3['background'] = 'lightblue'
    b3['borderwidth'] = 0

# labelit, entryt ja painikkeet
L_info = tkinter.Label(text="First time? Read the info first!", bg="lightblue") #Label info
L_info.pack()
L_info.place(x=47, y=12)

L1 = tkinter.Label(text="Service", bg="lightblue") #Label 1
L1.pack()
L1.place(x=228, y=48)

e1 = tkinter.Entry(w) #Entry 1
e1.pack()
e1.place(x=190, y=70)

L2 = tkinter.Label(text="Password length", bg="lightblue") #Label 2
L2.pack()
L2.place(x=205, y=93)

L3 = tkinter.Label(text="Please enter the length in numbers!", bg="lightblue") #Label 3
L3.pack()
L3.place(x=158, y=1000)

L4 = tkinter.Label(text="Could not write to a memory, memory not found", bg="lightblue") #Label 4
L4.pack()
L4.place(x=125, y=1000)

L5 = tkinter.Label(text="Can't write to C:/. Permission denied") #Label 5
L5.pack()
L5.place(x=140, y=1000)

L6 = tkinter.Label(text="© Janne Arkko 2021, All rights reserved", bg="lightblue") #label 6
L6.pack()
L6.place(x=150, y=280)

L7 = tkinter.Label(text="v 1.0", bg="lightblue")#Label 7
L7.pack()
L7.place(x=2, y=280)

e2 = tkinter.Entry(w) #Entry 2
e2.pack()
e2.place(x=190, y=115)

b1 = tkinter.Button(w, text="Generate a password!", command=password, cursor="hand2") #Button 1
b1.pack()
b1.place(x=191, y=190)
b1.bind("<Enter>", on_enter)
b1.bind("<Leave>", on_leave)

b2 = tkinter.Button(w, text="Info", command=info, cursor="hand2") # Button 2
b2.pack()
b2.place(x=10, y=10)
b2.bind("<Enter>", on_enter_2)
b2.bind("<Leave>", on_leave_2)

b3 = tkinter.Button(w,text="Hint",bg="lightblue", command=hint, cursor="hand2", borderwidth=0) # Button 3
b3.pack()
b3.place(x=320, y=149)
b3.bind("<Enter>", on_enter_3)
b3.bind("<Leave>", on_leave_3)


drives = [ chr(x) + ":" for x in range(65,91) if os.path.exists(chr(x) + ":") ] # hae käyttäjän kovalevytiedot
var1 = StringVar(w) # drop down menun oletusmuuttuja
var1.set("Select a drive") # oletusteksti
O1 = OptionMenu(w,var1,*drives) #dropdown menun sisältö
O1.pack()
O1.place(x=197, y=145)
O1.config(width=11, cursor="hand2")

w.mainloop() # mainlooppi