const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');
const crossButtons = document.querySelectorAll('.close-button');
const tabContainer = document.getElementById('tab-container');
const tabContentContainer = document.getElementById('tab-content');
const consoleOutput = document.getElementById('console-output');
const consoleOutput2 = document.getElementById('console-output2');
const inputCommand = document.getElementById('input-command');
const textContainer = document.querySelector('.text-container');

tabButtons.forEach((button) => {
    button.addEventListener('click', () => {
        // Set the active tab
        setActiveTab(button.dataset.tab);
    });
});

crossButtons.forEach((cross) => {
    cross.addEventListener('click', (event) => {
        // Get the tab to close
        const tabToClose = event.target.parentElement.dataset.tab;

        // Close the tab
        closeTab(tabToClose);
    });
});

function setActiveTab(tabName) {
    tabButtons.forEach((button) => {
        const isActive = button.dataset.tab === tabName;
        button.classList.toggle('active', isActive);
    });

    tabContents.forEach((content) => {
        const shouldDisplay = content.dataset.tab === tabName;
        content.style.display = shouldDisplay ? 'block' : 'none';
    });
}

function closeTab(tabName) {
    const tabToClose = document.querySelector(`[data-tab="${tabName}"]`);
    const tabContentToClose = document.querySelector(`[data-tab="${tabName}"]`);

    if (!tabToClose || !tabContentToClose) {
        return;
    }

    // Remove the tab and content
    tabToClose.remove();
    tabContentToClose.remove();

    // Activate the first remaining tab

    const remainingTabs = document.querySelectorAll('.tab-button');
    if (remainingTabs.length > 0) {
        setActiveTab(remainingTabs[0].dataset.tab);
    }
}

// Set the initial active tab
setActiveTab(tabButtons[0].dataset.tab);

function addPortfolio() {
    output = "  _____           _    __      _ _       \r\n |  __ \\         | |  \/ _|    | (_)      \r\n | |__) |__  _ __| |_| |_ ___ | |_  ___  \r\n |  ___\/ _ \\| \'__| __|  _\/ _ \\| | |\/ _ \\ \r\n | |  | (_) | |  | |_| || (_) | | | (_) |\r\n |_|   \\___\/|_|   \\__|_| \\___\/|_|_|\\___\/ \r\n                                         "
    addTextToContainer(output);
    output = `
ABOUT ME    

    I am Janne Arkko, 32 years old firefighter, soon-to-be ICT-engineer, living in Tikkakoski, Jyväskylä.
    I have been a firefighter for a decade now and learned socials skills far beyond comparison    
    through different roles as a firefighter and paramedic. 
    But the thing is: I've lost the desire to be a firefighter...
    
    For years, my motivation towards my work in fire departments had decreased. In 2018 I started a secondary job as an entrepreneur
    working in construction business and I was thrilled about the new unknown and the things I could accomplish.
    Then our second child was born in 2020 and my wife asked me if we could move to Jyväskylä, where she was born.
    I said yes, but with a term: I will try to apply to Jyväskylä University of Applied Science to study ICT-field.
    So we moved to Central Finland and I had to quit being an entrepreneur, but luckily, I was accepted to the school!
    
    As of 2021, I've been studying for Bachelor of Engineering in Information and Communications Technology in
    Jyväskylä University of Applied Science. I am most interested in programming and data science in general.
    In the future I could imagine myself working in a software company, creating fascinating machine learning
    and AI models for consumers to feast upon. I also have a small wavering dream of working with robotics
    in the future, but we shall see.
    
    My points of interest are quite practical: I love spending time with my family and in my spare time I like to challenge
    myself with coding tasks, much like this website right here, to keep up the skills. In summer 2023, I started a course
    in Udemy about Unreal Engine 5 game development and I've been completing it every now and then and I really like it.
    I might not consider myself being a game developer in the future, but being a programmer requires some insight
    on different fields of coding. Nothing goes to waste.
    
STUDIES

    In 2010 I graduated from a vocational school in Muonio with a degree in construction. After that, I worked for a few years and did my
    mandatory military service in 2012, and then went as a peacekeeper to Lebanon for a year.
    After I served, I applied to the Fire Academy in Kuopio to become a firefighter.
    Needless to say, I got in.
    
    As of now, like mentioned above, I study to become an ICT-engineer in Jyväskylä University of Applied Science.
    Decision to apply was easy: I've always liked computers, ever since we had that Commodore 64 in the 90's.
    
    In the future, I definitely plan to study more because my future field is so vast that it would be
    sheer madness to stay still.
    
SAMPLES OF WORK

    In Zappacket Ltd, database design for storing information about the company's customers and their customers.
    It was quite simple relational database, but gave really good experience on db designing. Unfortunately,
    I wasn't able to participate in the implementation, but it was successfull overall.
    
    I designed and created my own weather application using Raspberry Pi and RuuviTag-sensor. Sensor-data
    was stored in Influx -db on my Raspberry via collector software using bluetooth.
    That data was then fetched with a node.js application and presented in a webpage on my own domain.
    Parsing of data and it's presentation was made with traditional JavaScript techniques.
    Later, I used the same application to turn my Raspberry Pi into a watering robot
    using humidity as the primary trigger for starting a circulation pump to pump water into a plant
    through the Raspberry's I/O pins.`;

    addTextToContainer(output);
}

function addCV() {
    // add the ascii art CV
    output = "   _____                _            _                  __      ___ _             \r\n  \/ ____|              (_)          | |                 \\ \\    \/ (_) |            \r\n | |    _   _ _ __ _ __ _  ___ _   _| |_   _ _ __ ___    \\ \\  \/ \/ _| |_ __ _  ___ \r\n | |   | | | | \'__| \'__| |\/ __| | | | | | | | \'_ ` _ \\    \\ \\\/ \/ | | __\/ _` |\/ _ \\\r\n | |___| |_| | |  | |  | | (__| |_| | | |_| | | | | | |    \\  \/  | | || (_| |  __\/\r\n  \\_____\\__,_|_|  |_|  |_|\\___|\\__,_|_|\\__,_|_| |_| |_|     \\\/   |_|\\__\\__,_|\\___|";
    addTextToContainer(output);
    output = `
WHO

    Janne Arkko
    Firefighter, ICT-engineering student

SUMMARY    
    
    Problems are made to be solved. As new technologies emerge and old ones are developed,
    I strive with strong work ethic and motivation to stay firmly on the cutting edge.
    The most rewarding thing, after family, is to learn something new.

WORK EXPERIENCE (most notable)    

    Central Finland Department of Emergency Services
    2020->
    Roles of firefighter and paramedic

    Entrepreneur in construction business
    2018 - 2020
    Contractor in smaller construction projects and subcontractor
    in medium and large-scale projects

    Western Uusimaa Department of Emergency Services
    2015 - 2020
    Roles of firefighter and paramedic

    Finnish Defence Forces
    2012 - 2013
    Peacekeeper in UNIFIL III -operation in Lebanon

EDUCATION (most notable)

    Jyväskylä University of Applied Science
    Bachelor of Engineering, Information and Communications Technology
    Programming, data-analytics and AI
    Graduation est. 2025
    GPA 4,41/5,00

SKILLS

    Soft skills
        -Communication
        -Teamplayer
        -Problem-solving
        -Solution-oriented
        -Design Thinking
    Hard skills
        -Python, C#, JavaScript, Node.js
        -HTML, CSS
        -SQL, NoSQL
        -Figma
        
PROJECTS

    Zappacket clientele database design
    2022
    Designer of Zappacket clientele database, not including implementation

    Weather-app with RuuviTag and Raspberry Pi
    2023
    As a hobby, I designed and implemented a weather-app running on PI.
    It gathered data from RuuviTag -sensor, stored it into a database
    and the data was fetched and processed with Node.js

POI

    -Coding
    -Data Science
    -Game development with UE5
    -Hitting the gym`

    addTextToContainer(output);
}
function addContact() {
    output = "   _____            _             _   \r\n  \/ ____|          | |           | |  \r\n | |     ___  _ __ | |_ __ _  ___| |_ \r\n | |    \/ _ \\| \'_ \\| __\/ _` |\/ __| __|\r\n | |___| (_) | | | | || (_| | (__| |_ \r\n  \\_____\\___\/|_| |_|\\__\\__,_|\\___|\\__|";
    addTextToContainer(output);
    output = `
EMAIL
    
    janne.arkko@outlook.com

PHONE

    +3584o565529o

SOCIAL MEDIA

    LinkedIn
        www.linkedin.com/in/janne-arkko-a67062210
    Facebook
        https://www.facebook.com/Pursari`;
    addTextToContainer(output);
}
function addWhoami() {
    output = `
Introducing Janne Arkko: The Versatile Firefighter with a Tech Vision

Meet Janne Arkko, a remarkable individual who embodies the spirit of versatility
and a passion for technology. At 32 years old, Janne serves as a dedicated firefighter,
fearlessly confronting challenges to protect and save lives.\nBut Janne's pursuits extend far beyond the world of firefighting;
he's also a determined student pursuing a Bachelor of Engineering in Information and Communication Technology,
expanding his horizons in the fast-paced tech industry.

In addition to his impressive career and academic pursuits,
Janne treasures his role as a loving husband and devoted father to two wonderful children.
Their family circle is further enhanced by the presence of an American Bulldog,
a faithful and cherished companion in their home.

When Janne isn't battling fires or immersed in his studies,
he delights in a trio of invigorating hobbies. With a passion for coding,
he brings innovative ideas to life through the language of programming.
Embracing the benefits of a healthy lifestyle, Janne finds solace in hitting the gym,
where he not only strengthens his body but also nurtures his focus and determination.
However, his greatest joy comes from spending quality time with his family,
creating precious memories that bring smiles to their faces.

Janne is more than just a firefighter and tech enthusiast;
he's a lifelong learner, eager to explore and master new areas of knowledge.
With a thirst for continuous growth, he seeks out new skills and experiences,
driven by an innate curiosity about the world around him.

Janne's standout quality lies in his ability to break free from conventional thinking.
He possesses a unique talent for analyzing complex situations,
viewing challenges from an objective and out-of-the-box perspective.
This innovative approach empowers him to find creative solutions, making him an invaluable asset in any endeavor.

As he aspires to new heights, Janne's dream job lies at the cutting edge of technology.
His passion for Artificial Intelligence and Machine Learning fuels his desire to
contribute to groundbreaking advancements in this rapidly evolving field.
Janne Arkko is a force to be reckoned with –
a multifaceted individual who continues to make a significant impact in every facet of his life.
From firefighting heroism to tech-driven innovation,
he inspires others with his determination and commitment to making a positive difference in the world.
With Janne at the helm, the future is undoubtedly bright and filled with endless possibilities.

(BE ADVISED, TEXT ABOVE HAS BEEN WRITTEN BY CHATGPT BASED ON GIVEN PARAMETERS.
EVEN IT IS FACTUAL, IT SHOULD BE PRIMARILY CONSIDERED AS A GOOD JOKE)
`;
    addTextToContainer(output);
}
function exitPage() {
    const text = "\t\t\t\t\t\u2800\u2800\u2800\u2800\u2800\u2800\u2880\u28E0\u28E4\u28F4\u28F6\u28F6\u283F\u283F\u283F\u283F\u283F\u283F\u28B6\u28F6\u28E6\u28E4\u28C4\u2840\u2800\u2800\u2800\u2800\u2800\u2800\r\n\t\t\t\t\t\u2800\u2800\u2800\u2880\u28F4\u28FE\u283F\u281B\u2809\u2801\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2809\u281B\u283F\u28F7\u28E6\u2840\u2800\u2800\u2800\r\n\t\t\t\t\t\u2800\u2880\u28F4\u287F\u280B\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2819\u28BF\u28E6\u2840\u2800\r\n\t\t\t\t\t\u28A0\u28FF\u280B\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2819\u28FF\u2844\r\n\t\t\t\t\t\u28FE\u284F\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u28B8\u28F7\r\n\u2800\u2800\u2800\u2800\u28E0\u281E\u2809\u2889\u2829\u288D\u2859\u281B\u280B\u28C9\u2809\u280D\u2889\u28C9\u28C9\u28C9\u2829\u2889\u2809\u281B\u2832\u28C4\u2800\u2800\t\u28FF\u2847\u2800\u2800\u2800\u2800\u2800You can\'t exit lol\u2800\u2800\u2800\u2800\u2800 \u28B8\u28FF\r\n\u2800\u2800\u2800\u2874\u2801\u2800\u2802\u2860\u2811\u2800\u2800\u2800\u2802\u2800\u2800\u2800\u2800\u2820\u2800\u2800\u2810\u2801\u288A\u2800\u2804\u2808\u28A6\u2800\u2800\t\u2838\u28FF\u2844\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u28A0\u28FF\u2807\r\n\u2800\u28E0\u287E\u2801\u2800\u2800\u2804\u28F4\u286A\u283D\u28FF\u2853\u28A6\u2800\u2800\u2840\u2800\u28E0\u2896\u28FB\u28FF\u28D2\u28E6\u2800\u2840\u2880\u28C8\u28A6\u2840\u2800\u2800\u2819\u28BF\u28E6\u2840\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2880\u28F4\u287F\u280B\u2800\r\n\u28F0\u2811\u28B0\u280B\u28A9\u2859\u2812\u2826\u2816\u280B\u2800\u2808\u2801\u2800\u2800\u2800\u2800\u2808\u2809\u2800\u2818\u2826\u2824\u2834\u2812\u285F\u2832\u284C\u281B\u28C6\u2800\u2800\u2800\u2819\u28FF\u2846\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u28C0\u28E4\u28F6\u283F\u280B\u2800\u2800\u2800\r\n\u28B9\u2870\u2878\u2808\u28BB\u28C8\u2813\u2866\u28A4\u28C0\u2840\u28BE\u2829\u2824\u2800\u2800\u2824\u280C\u2873\u2810\u28D2\u28E0\u28E4\u2816\u288B\u285F\u2812\u284F\u2844\u285F\u2800\u2800\u2800\u28B0\u28FF\u2800\u2800\u2800\u2800\u2800\u2880\u28F6\u28E6\u28E4\u28E4\u28E4\u28E4\u28F4\u28F6\u28F6\u283F\u283F\u281B\u2809\u2800\u2800\u2800\u2800\u2800\u2800\r\n\u2800\u2819\u2886\u2800\u2800\u283B\u2859\u287F\u28A6\u28C4\u28F9\u2819\u2812\u28B2\u2826\u2834\u2856\u2812\u281A\u28CF\u28C1\u28E4\u28FE\u289A\u285D\u2801\u2800\u28E8\u281E\u2800\u2800\u2800\u28E0\u28FF\u2803\u2800\u2880\u28E0\u28E4\u28FE\u281F\u280B\u2808\u2809\u2809\u2809\u2809\u2801\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\r\n\u2800\u2800\u2808\u28A7\u2800\u2800\u2819\u28A7\u2840\u2808\u285F\u281B\u2837\u287E\u28F6\u28FE\u28F7\u283E\u281B\u28BB\u2809\u2880\u287D\u280B\u2800\u2800\u28F0\u2803\u2800\u2800\u2800\u28BF\u28F7\u287E\u283F\u281F\u281B\u2809\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\r\n\u2800\u2800\u2800\u2800\u2811\u28A4\u2860\u2882\u280C\u285B\u2826\u2824\u28C4\u28C7\u28C0\u28C0\u28F8\u28C0\u2864\u283C\u281A\u2849\u2884\u2820\u28E0\u281E\u2801\u2800\u2800\r\n\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2809\u2813\u282E\u28D4\u2841\u2826\u2800\u28E4\u2824\u2824\u28E4\u2804\u2830\u280C\u28C2\u286C\u2816\u280B\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\r\n\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800  \u2800\u2809\u2812\u2824\u28A4\u28C0\u28C0\u2864\u2834\u2812\u2809\u2800\u2800\u2800\u2800\r\n\u2800";
    const textElement = document.createElement('div');
    textElement.className = 'console-output';
    textElement.textContent = text;
    textContainer.appendChild(textElement);
}
let history = []; // history array
let historyIndex = -1; // Initialize the history index to -1 (no selection initially)

function showHistory() { // print history with cmd
    output = "Id      Duration        CommandLine\n--      --------        -----------";
    addTextToContainer(output,"green");
    history.forEach((entry) => {
        const [Id, Duration, CommandLine] = entry;
        if (Id < 10){
            output = Id + "          " + Duration + "        " + CommandLine;
        }
        if (Id >= 10){
            output = Id + "         " + Duration + "        " + CommandLine;
        }
        addTextToContainer(output);
    })
}

function executeCommand(inputCommand) { // function to execute everything withing the website, listens the input fields.
    const command = inputCommand.value.trim().toLowerCase();
    history.push([history.length + 1,Math.random().toFixed(3),command])
    let output = ``;

    switch (command) {

        // specific commands
        case 'help':
            output += "Available commands:\n    - whoami\n    - ls\n    - cat\n    - cls\n    - help\n    - history\n    - exit\n    \nType 'help <cmdlet>' to get more information about the cmdlet.";
            output += '\n';
            addTextToContainer(output);
            break;

        case 'cls':
            textContainer.innerHTML = ''; // Clear the text container
            output += '\n';
            addTextToContainer(output);
            break;
        case 'whoami':
            addWhoami();
            break;
        case 'cat':
            output += "cmdlet Get-Content at command pipeline position 1\nYou must supply a value for the following parameter: Path[0]\nSyntax: cat <Path[i]>\nType 'help cat' to get help"
            addTextToContainer(output)
            break;
        case 'ls':
            output += "Mode               LastWriteTime             Length  Name\n----               -------------             ------  ----"
            addTextToContainer(output,"green")
            output ="";
            output +="-ar--          20.7.2023   19.18            1452313  portfolio.txt"
            output +="\n-ar--          13.4.2023   10.45              56241  cv.txt"
            output +="\n-ar--           4.2.2023   09.04               1566  contact.txt"
            addTextToContainer(output)
            break;
        case 'exit':
            exitPage();
            break;
        case 'history':
            showHistory();
            break;

        // cat commands
        case 'cat portfolio.txt':
            addPortfolio();
            break;
        case 'cat cv.txt':
            addCV();
            break;
        case 'cat contact.txt':
            addContact();
            break;

        // help -commands
        case 'help whoami':
            output += "NAME\n    Get-Whoami\nSYNTAX\n    Get-Whoami [<string>] [-Path <string>] [-Category {Alias | Cmdlet | Provider | General | FAQ | Glossary | Help\n    File | ScriptCommand | Function | Filter | ExternalScript | All | DefaultHelp | DscResource | Class | Configur\n    ation}] [-Full] [-Component <string[]>] [-Functionality <string[]>] [-Role <string[]>] [<CommonParameters>]\nDESCRIPTION\n    Get-Whoami (alias 'whoami') -cmdlet is used to display information about the author of this webpage."
            addTextToContainer(output);
            break;
        case 'help ls':
            output += "NAME\n    Get-ChildItem\nSYNTAX\n    Get-ChildItem [[-Path] <string[]>] [[-Filter] <string>] [-Include <string[]>] [-Exclude <string[]>] [-Recurse]\n    [-Depth <uint>] [-Force] [-Name] [-Attributes {ReadOnly | Hidden | System | Directory | Archive | Device | Norm\n    al | Temporary | SparseFile | ReparsePoint | Compressed | Offline | NotContentIndexed | Encrypted | IntegritySt\n    ream | NoScrubData}] [-FollowSymlink] [-Directory] [-File] [-Hidden] [-ReadOnly] [-System] [<CommonParameters>]\nDESCRIPTION\n    Get-ChildItem (alias 'ls') -cmdlet is used to list all child items of current folder."
            addTextToContainer(output);
            break;
        case 'help cat':
            output += "NAME\n    Get-Content\nSYNTAX\n    Get-Content [-Path] <string[]> [-ReadCount <long>] [-TotalCount <long>] [-Tail <int>] [-Filter <string>] [-Incl\n    ude <string[]>] [-Exclude <string[]>] [-Force] [-Credential <pscredential>] [-Delimiter <string>] [-Wait] [-Raw\n    ] [-Encoding <Encoding>] [-AsByteStream] [-Stream <string>] [<CommonParameters>]\nDESCRIPTION\n    Get-Content (alias 'cat') -cmdlet is used to display contents of spesific file."
            addTextToContainer(output);
            break;
        case 'help cls':
            output += "NAME\n    Clear-Host\nSYNTAX\n    Clear-Host [<CommonParameters>]\nDESCRIPTION\n    Use Clear-Host (alias 'cls') -cmdlet to clear host screen."
            addTextToContainer(output);
            break;
        case 'help help':
            output += "NAME\n    Get-Help\nSYNTAX\n    Get-Help [[-Name] <string>] [-Path <string>] [-Category {Alias | Cmdlet | Provider | General | F\n    AQ | Glossary | HelpFile | ScriptCommand | Function | Filter | ExternalScript | All | DefaultHel\n    p | DscResource | Class | Configuration}] [-Full] [-Component <string[]>] [-Functionality <strin\n    g[]>] [-Role <string[]>] [<CommonParameters>]\nDESCRIPTION\n    Use Get-Help (alias 'help') -cmdlet to get help about cmdlets."
            addTextToContainer(output);
            break;
        case 'help exit':
            output += "Name                   Category  Module                      Synopsis\n----                   --------  ------                      --------"
            addTextToContainer(output,"green");
            output ="";
            output += "Exit-JSHostProcess     Cmdlet    Janne's Hell.Core   ...";
            output += "\nExit-JSSession         Cmdlet    Janne's Hell.Core   ..."
            addTextToContainer(output);
            break;


        
        // default output
        default:
            output += command + ":"+ " The term " + command + " is not recognized as a name of a cmdlet, function, script file, or executable program.\nCheck the spelling of the name, or if a path was included, verify that the path is correct and try again.";
            output += '\n';
            addTextToContainer(output,"red");
            break;
    }

    historyIndex = -1;
    // Add a new input field for the next command
    addNewInputField();
}

function updateInputValueFromHistory() {
    const inputCommands = document.querySelectorAll('.input-field');
    if (historyIndex >= 0 && historyIndex < history.length) {
        const latestInput = inputCommands[inputCommands.length - 1];
        latestInput.value = history[historyIndex][2]; // Set the input value to the history entry command
    }
}

function addTextToContainer(text,color) {
    const textElement = document.createElement('div');
    textElement.className = 'console-output';
    textElement.style.color = color
    textElement.textContent = text;
    textContainer.appendChild(textElement);
}

function handleKeydown(event) {
    if (event.key === 'Enter') {
        executeCommand(event.target);
    } else if (event.key === 'ArrowUp') { // key events to trigger command scrolling 
        // Handle key up (scroll to the latest command and then to the latest before that)
        if (historyIndex === -1) {
            historyIndex = history.length - 1;
        } else if (historyIndex > 0) {
            historyIndex--;
        }
        updateInputValueFromHistory();
    } else if (event.key === 'ArrowDown') {
        // Handle key down (scroll to the latest command and then to the latest after that)
        if (historyIndex < history.length - 1) {
            historyIndex++;
        } else if (historyIndex === history.length - 1) {
            historyIndex = -1;
        }
        updateInputValueFromHistory();
    }
}

function addNewInputField() {
    const inputContainer = document.createElement('div');
    inputContainer.className = 'input-container text-and-input';
    inputContainer.innerHTML = `
        <span class="input-label">JS C:\index.html&gt;</span>
        <input type="text" class="input-field" id="input-command">
    `;
    textContainer.appendChild(inputContainer);

    // Get the newly created input field
    const newInputCommand = inputContainer.querySelector('.input-field');

    // Add the event listener to the new input field
    newInputCommand.addEventListener('keydown', handleKeydown);

    // Focus on the new input field
    newInputCommand.focus();
}

// Create the initial input field
addNewInputField();
