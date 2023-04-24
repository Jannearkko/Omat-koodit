using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace Very_Basic_Platform_Game
{
    public partial class Form1 : Form
    {
        bool goLeft, goRight, jumping, isGameOver;
        int jumpSpeed;
        int force;
        int score = 0;
        int playerSpeed = 7;
        int horizontalSpeed = 5;
        int verticalSpeed = 3;

        int enemyOneSpeed = 2;
        int enemyTwoSpeed = 3;
        int enemyThreeSpeed = 6;
        int enemyFourSpeed = 1;
        int enemyFiveSpeed = 2;
        int enemySixSpeed = 3;

        public Form1()
        {
            InitializeComponent();
        }

        private void pictureBox7_Click(object sender, EventArgs e)
        {

        }

        private void MainGameTimerEvent(object sender, EventArgs e)
        {
            txtScore.Text = "Score: " + score;
            player.Top += jumpSpeed;
            if (goLeft == true)
            {
                player.Left -= playerSpeed;
            }
            if (goRight == true)
            {
                player.Left += playerSpeed;
            }
            if (jumping == true && force < 0)
            {
                jumping = false;
            }
            if (jumping == true)
            {
                jumpSpeed = -8;
                force -= 1;
            }
            else
            {
                jumpSpeed = 10;
            }
            foreach(Control x in this.Controls)
            {
                if (x is PictureBox)
                {
                    if ((string)x.Tag == "platform")
                    {
                        if (player.Bounds.IntersectsWith(x.Bounds))
                        {
                            force = 8;
                            player.Top = x.Top - player.Height;

                            if ((string)x.Name == "horizontalPlatform" && goLeft == false || (string)x.Name == "horizontalPlatform" && goRight == false)
                            {
                                player.Left -= horizontalSpeed;
                            }
                        }
                        x.BringToFront();
                    }
                    if ((string)x.Tag == "coin")
                    {
                        if (player.Bounds.IntersectsWith(x.Bounds) && x.Visible == true)
                        {
                            x.Visible = false;
                            score++;
                        }
                    }
                    if (((string)x.Tag == "enemy"))
                    {
                        if (player.Bounds.IntersectsWith(x.Bounds))
                        {
                            gameTimer.Stop();
                            isGameOver = true;
                            txtScore.Text = "Score: " + score + Environment.NewLine + "Game Over!";
                        }
                    }
                }
            }
            // platform movement
            horizontalPlatform.Left -= horizontalSpeed;
            if(horizontalPlatform.Left < 0 || horizontalPlatform.Left + horizontalPlatform.Width > 900)
            {
                horizontalSpeed = -horizontalSpeed;
            }
            verticalPlatform.Top -= verticalSpeed;
            if(verticalPlatform.Top < 320 || verticalPlatform.Top+verticalPlatform.Height > 800)
            {
                verticalSpeed = -verticalSpeed;
            }
            // enemy movement
            enemyOne.Left -= enemyOneSpeed;
            if (enemyOne.Left < pictureBox4.Left || enemyOne.Left + enemyOne.Width > pictureBox4.Left + pictureBox4.Width)
            {
                enemyOneSpeed = -enemyOneSpeed;
            }
            enemyTwo.Left += enemyTwoSpeed;
            if (enemyTwo.Left < pictureBox5.Left || enemyTwo.Left + enemyTwo.Width > pictureBox5.Left + pictureBox5.Width)
            {
                enemyTwoSpeed = -enemyTwoSpeed;
            }
            enemyThree.Left += enemyThreeSpeed;
            if (enemyThree.Left < pictureBox9.Left || enemyThree.Left + enemyThree.Width > pictureBox9.Left + pictureBox9.Width)
            {
                enemyThreeSpeed = -enemyThreeSpeed;
            }
            enemyFour.Left -= enemyFourSpeed;
            if (enemyFour.Left < pictureBox11.Left || enemyFour.Left + enemyFour.Width > pictureBox11.Left + pictureBox11.Width)
            {
                enemyFourSpeed = -enemyFourSpeed;
            }
            enemyFive.Left -= enemyFiveSpeed;
            if (enemyFive.Left < pictureBox14.Left + 300 || enemyFive.Left + enemyFive.Width > pictureBox14.Left + pictureBox14.Width)
            {
                enemyFiveSpeed = -enemyFiveSpeed;
            }
            enemySix.Left += enemySixSpeed;
            if (enemySix.Left < pictureBox14.Left + 50 || enemySix.Left + enemySix.Width > pictureBox14.Left + pictureBox14.Width)
            {
                enemySixSpeed = -enemySixSpeed;
            }

            // End game if player drops off screen
            if (player.Top + player.Height > this.ClientSize.Height + 50)
            {
                gameTimer.Stop();
                isGameOver = true;
                txtScore.Text = "Score: " + score + Environment.NewLine + "Game Over!";
            }

            // If player reaches the door
            if (player.Bounds.IntersectsWith(finish.Bounds))
            {
                gameTimer.Stop();
                isGameOver = true;
                txtScore.Text = "Score: " + score + Environment.NewLine + "You Win!";
            }
        }

        private void KeyIsDown(object sender, KeyEventArgs e)
        {
            if (e.KeyCode == Keys.Left)
            {
                goLeft = true;
            }
            if (e.KeyCode == Keys.Right)
            {
                goRight = true;
            }
            if (e.KeyCode == Keys.Up && jumping == false)
            {
                jumping = true;   
            }
        }

        private void KeyIsUp(object sender, KeyEventArgs e)
        {
            if (e.KeyCode == Keys.Left)
            {
                goLeft = false;
            }
            if (e.KeyCode == Keys.Right)
            {
                goRight = false;
            }
            if (jumping == true)
            {
                jumping = false;
            }
            if (e.KeyCode == Keys.Enter && isGameOver == true)
            {
                RestartGame();
            }
        }
        private void RestartGame()
        {
            jumping = false;
            goLeft = false;
            goRight = false;
            isGameOver = false;
            score = 0;
            txtScore.Text = "Score: " + score;

            foreach (Control x in this.Controls) // when restarting, revert invisible coins back to visible
            {
                if (x is PictureBox && x.Visible == false)
                {
                    x.Visible = true;
                }
            }
            // reset player and enemy positions
            player.Left = 12;
            player.Top = 883;
            enemyOne.Left = 406;
            enemyTwo.Left = 652;
            enemyThree.Left = 567;
            enemyFour.Left = 103;
            enemyFive.Left = 683;
            enemySix.Left = 227;
            horizontalPlatform.Left = 286;
            verticalPlatform.Top = 705;

            gameTimer.Start();
        }
    }
}
