using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace Hangman_Game
{
    public partial class Form1 : Form
    {
        bool isGameOver;
        int tries = 10;
        public Form1()
        {
            InitializeComponent();
        }
        public class HangManControl : Panel
        {
            private int columns;
            private int rows = 1;
            public HangManControl(string word)
            {
                this.columns = word.Length;
                this.DoubleBuffered = true;
                this.ResizeRedraw = true;
            }

        }

        private void Form1_Paint(object sender, PaintEventArgs e)
        {
            Color black = Color.FromArgb(255,0,0,0);
            Color brown = Color.FromArgb(150, 75, 0);
            Pen blackPen = new Pen(black);
            Pen brownPen = new Pen(brown);
            blackPen.Width = 10;
            brownPen.Width = 10;
            e.Graphics.DrawLine(brownPen, 700, 600, 1100, 600);
            e.Graphics.DrawLine(brownPen, 705, 600, 705, 700);
            e.Graphics.DrawLine(brownPen, 1095, 600, 1095, 700);
            e.Graphics.DrawLine(brownPen, 705, 650, 750, 600);
            e.Graphics.DrawLine(brownPen, 1050, 600, 1095, 650);
        }
        private void MainGameTimerEvent(object sender, EventArgs e)
        {
            label1.Text = "Tries: " + tries;
            List<string> list = new List<string>
            { "YLLÄPITÄJÄ","YÖPERHONEN","KARIKATYYRI","EVAKUOINTI","FLORETTI","PLUTOONA","VULKANISMI","KSYLOFONI","SYNTAKSI","TALISMAANI","PUUROKATTILA","KUVAAMATAITO","KUVAKIRJA","PANNUKAKKU","PERUNATEATTERI","JÄÄTELÖBAARI","VOHVELI","RIIPPUSILTA" };
            Random random = new Random();
            int index = random.Next(list.Count);
            string word = list[index];

        }

        private void Form1_Load(object sender, EventArgs e)
        {

        }
    }
}
