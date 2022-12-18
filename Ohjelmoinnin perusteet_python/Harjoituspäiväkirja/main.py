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
image_path = resource_path("book.ico")

# luodaan ikkuna
w = tkinter.Tk() 
w.title("Harjoituspäiväkirja")
w.geometry("700x700")
w.configure(bg="lightgrey")
w.iconbitmap(image_path) # Ikoni on CC -lisenssin alainen
w.resizable(False, False)

harjoitukset = ["Kuntosali", "Nyrkkeily"]
kuntosali_harjoitukset = ["Painonnosto","Jalat","Kädet","Rinta","Selkä"]
painonnosto_sarjat = ["Tempaus","Työntö"]

var1 = StringVar(w)
var1.set("Ei valittu")
var2 = StringVar(w)
var2.set("Ei valittu")
var3 = StringVar(w)
var3.set("Lisää liike")


def lisaa_entry_tempaus_1():
    ens_entry = tkinter.Entry(w,width=5)
    ens_entry.pack()
    ens_entry.place(x=200, y=130)
    ens_label = tkinter.Label(text="kg", bg="lightgrey")
    ens_label.pack()
    ens_label.place(x=233,y=128)
    ens_label_x = tkinter.Label(text="x", bg="lightgrey")
    ens_label_x.pack()
    ens_label_x.place(x=255, y=128)
    ens_entry_krt = tkinter.Entry(w,width=5)
    ens_entry_krt.pack()
    ens_entry_krt.place(x=270, y=130)

def lisaa_entry_tempaus():
    ens_entry = tkinter.Entry(w,width=5)
    ens_entry.pack()
    ens_entry.place(x=200, y=118)
    ens_entry_krt = tkinter.Entry(w,width=5)
    ens_entry_krt.pack()
    ens_entry_krt.place(x=270, y=118)
    ens_label = tkinter.Label(text="kg", bg="lightgrey")
    ens_label.pack()
    ens_label.place(x=233,y=116)
    ens_label_x = tkinter.Label(text="x", bg="lightgrey")
    ens_label_x.pack()
    ens_label_x.place(x=255, y=116)

def tempaus_lisaa_sarjat():
    tempaus_sarjat_menu = tkinter.Button(w, text="Lisää sarja", command=lisaa_entry_tempaus())
    tempaus_sarjat_menu.pack()
    tempaus_sarjat_menu.place(x=200, y=82)

def painonnosto_liike_valittu(valinta):
    valinta = var3.get()
    if valinta == painonnosto_sarjat[0]:
        tempaus_lisaa_sarjat()

def painonnosto():
    label_kesto = tkinter.Label(text="Kesto", bg="lightgrey")
    label_kesto.pack()
    label_kesto.place(x=10,y=116)
    kesto_entry = tkinter.Entry(w, width=17)
    kesto_entry.pack()
    kesto_entry.place(x=70, y=118)

    label_maxsyke = tkinter.Label(text="Max-syke", bg="lightgrey")
    label_maxsyke.pack()
    label_maxsyke.place(x=10, y=142)
    maxsyke_entry = tkinter.Entry(w, width=17)
    maxsyke_entry.pack()
    maxsyke_entry.place(x=70, y=143)
    
    label_keskisyke = tkinter.Label(text="Keskisyke", bg="lightgrey")
    label_keskisyke.pack()
    label_keskisyke.place(x=10, y=167)
    keskisyke_entry = tkinter.Entry(w, width=17)
    keskisyke_entry.pack()
    keskisyke_entry.place(x=70, y=168)

    sarjat_menu = tkinter.OptionMenu(w, var3, *painonnosto_sarjat, command=painonnosto_liike_valittu)
    sarjat_menu.pack()
    sarjat_menu.place(x=200, y=45)

def laatu_valittu(valinta):
    valinta = var2.get()
    if valinta == kuntosali_harjoitukset[0]:
        painonnosto()

def kuntosali():
    label_laatu = tkinter.Label(text="Laatu", bg="lightgrey")
    label_laatu.pack()
    label_laatu.place(x=10,y=83)
    laatu_menu = OptionMenu(w,var2,*kuntosali_harjoitukset, command=laatu_valittu) #dropdown menun sisältö
    laatu_menu.pack()
    laatu_menu.place(x=70, y=80)
    laatu_menu.config(width=11, cursor="hand2")

def harjoitus_valittu(valinta):
    valinta = var1.get()
    if valinta == harjoitukset[0]:
        kuntosali()
harjoitus_menu = OptionMenu(w,var1,*harjoitukset, command=harjoitus_valittu) #dropdown menun sisältö
harjoitus_menu.pack()
harjoitus_menu.place(x=70, y=45)
harjoitus_menu.config(width=11, cursor="hand2")

label_harjoitus = tkinter.Label(text="Harjoitus", bg="lightgrey")
label_harjoitus.pack()
label_harjoitus.place(x=10,y=50)

# label_laatu = tkinter.Label(text="Laatu", bg="lightgrey")
# label_laatu.pack()
# label_laatu.place(x=250,y=80)

# label_kesto = tkinter.Label(text="Kesto", bg="lightgrey")
# label_kesto.pack()
# label_kesto.place(x=250,y=110)

# label_max_syke = tkinter.Label(text="Max-syke", bg="lightgrey")
# label_max_syke.pack()
# label_max_syke.place(x=250,y=140)

# label_min_syke = tkinter.Label(text="Min-syke", bg="lightgrey")
# label_min_syke.pack()
# label_min_syke.place(x=250,y=170)

# label_keski_syke = tkinter.Label(text="Keskisyke", bg="lightgrey")
# label_keski_syke.pack()
# label_keski_syke.place(x=250,y=200)

# label_matka = tkinter.Label(text="Matka", bg="lightgrey")
# label_matka.pack()
# label_matka.place(x=250,y=230)

# label_toistot = tkinter.Label(text="Toistot", bg="lightgrey")
# label_toistot.pack()
# label_toistot.place(x=250,y=260)





w.mainloop() # mainlooppi