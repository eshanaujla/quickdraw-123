quick_draw_data_set = ["aircraft carrier", "airplane", "alarm clock", "ambulance", "angel", "animal migration", "ant", "anvil", "apple", "arm", "asparagus", "axe", "backpack", "banana", "bandage", "barn", "baseball", "baseball bat", "basket", "basketball", "bat", "bathtub", "beach", "bear", "beard", "bed", "bee", "belt", "bench", "bicycle", "binoculars", "bird", "birthday cake", "blackberry", "blueberry", "book", "boomerang", "bottlecap", "bowtie", "bracelet", "brain", "bread", "bridge", "broccoli", "broom", "bucket", "bulldozer", "bus", "bush", "butterfly", "cactus", "cake", "calculator", "calendar", "camel", "camera", "camouflage", "campfire", "candle", "cannon", "canoe", "car", "carrot", "castle", "cat", "ceiling fan", "cello", "cell phone", "chair", "chandelier", "church", "circle", "clarinet", "clock", "cloud", "coffee cup", "compass", "computer", "cookie", "cooler", "couch", "cow", "crab", "crayon", "crocodile", "crown", "cruise ship", "cup", "diamond", "dishwasher", "diving board", "dog", "dolphin", "donut", "door", "dragon", "dresser", "drill", "drums", "duck", "dumbbell", "ear", "elbow", "elephant", "envelope", "eraser", "eye", "eyeglasses", "face", "fan", "feather", "fence", "finger", "fire hydrant", "fireplace", "firetruck", "fish", "flamingo", "flashlight", "flip flops", "floor lamp", "flower", "flying saucer", "foot", "fork", "frog", "frying pan", "garden", "garden hose", "giraffe", "goatee", "golf club", "grapes", "grass", "guitar", "hamburger", "hammer", "hand", "harp", "hat", "headphones", "hedgehog", "helicopter", "helmet", "hexagon", "hockey puck", "hockey stick", "horse", "hospital", "hot air balloon", "hot dog", "hot tub", "hourglass", "house", "house plant", "hurricane", "ice cream", "jacket", "jail", "kangaroo", "key", "keyboard", "knee", "knife", "ladder", "lantern", "laptop", "leaf", "leg", "light bulb", "lighter", "lighthouse", "lightning", "line", "lion", "lipstick", "lobster", "lollipop", "mailbox", "map", "marker", "matches", "megaphone", "mermaid", "microphone", "microwave", "monkey", "moon", "mosquito", "motorbike", "mountain", "mouse", "moustache", "mouth", "mug", "mushroom", "nail", "necklace", "nose", "ocean", "octagon", "octopus", "onion", "oven", "owl", "paintbrush", "paint can", "palm tree", "panda", "pants", "paper clip", "parachute", "parrot", "passport", "peanut", "pear", "peas", "pencil", "penguin", "piano", "pickup truck", "picture frame", "pig", "pillow", "pineapple", "pizza", "pliers", "police car", "pond", "pool", "popsicle", "postcard", "potato", "power outlet", "purse", "rabbit", "raccoon", "radio", "rain", "rainbow", "rake", "remote control", "rhinoceros", "rifle", "river", "roller coaster", "rollerskates", "sailboat", "sandwich", "saw", "saxophone", "school bus", "scissors", "scorpion", "screwdriver", "sea turtle", "see saw", "shark", "sheep", "shoe", "shorts", "shovel", "sink", "skateboard", "skull", "skyscraper", "sleeping bag", "smiley face", "snail", "snake", "snorkel", "snowflake", "snowman", "soccer ball", "sock", "speedboat", "spider", "spoon", "spreadsheet", "square", "squiggle", "squirrel", "stairs", "star", "steak", "stereo", "stethoscope", "stitches", "stop sign", "stove", "strawberry", "streetlight", "string bean", "submarine", "suitcase", "sun", "swan", "sweater", "swingset", "sword", "syringe", "table", "teapot", "teddy-bear", "telephone", "television", "tennis racquet", "tent", "The Eiffel Tower", "The Great Wall of China", "The Mona Lisa", "tiger", "toaster", "toe", "toilet", "tooth", "toothbrush", "toothpaste", "tornado", "tractor", "traffic light", "train", "tree", "triangle", "trombone", "truck", "trumpet", "tshirt", "umbrella", "underwear", "van", "vase", "violin", "washing machine", "watermelon", "waterslide", "whale", "wheel", "windmill", "wine bottle", "wine glass", "wristwatch", "yoga", "zebra", "zigzag"]
array_length = quick_draw_data_set.length;


function setup() {
    canvas = createCanvas(400, 400);
    background("white");
    canvas.center();
    canvas.mouseReleased(classify_Canvas);
}

function preload(){
    classifier= ml5.imageClassifier("Doodlenet");
}



timer_counter = 0;
timer_check = 0;
drawn_sketch = 0;
answer_holder = 0;
score = 0;

 function newsketch(){
    random_no = Math.floor(Math.random() * array_length);+
    console.log(random_no);
    selected_sketch= quick_draw_data_set[random_no];
    console.log(selected_sketch);
    document.getElementById("drawn_sketch").innerHTML="Sketch to be drawn:    " + selected_sketch;

 }

 newsketch();

document.getElementById("score").innerHTML= "Score: "+ score;


function updateCanvas() {
    background("white");
}

function draw(){
   check_sketch(); 
   strokeWeight(13);
   stroke(0)// using the double quotes you can write any color default the 0 takes the black color//

   if(mouseIsPressed){
    line(pmouseX,pmouseY,mouseX,mouseY);
   }
}

function check_sketch(){

    timer_counter++;// or you can write timer_counter= timer_counter+1;
    document.getElementById("timer").innerHTML= "Timer: "+ timer_counter;
    console.log(timer_counter);
   
    if(drawn_sketch==selected_sketch){
        answer_holder= "set";
        score= score+1;
        document.getElementById("score").innerHTML= "Score: "+ score;
    }
    
    if(timer_counter>500){
        timer_counter=0;
        newsketch();
        document.getElementById("timer").innerHTML= "Timer: "+ timer_counter;
        timer_check= "completed";
        
    }
    
    if(timer_check== "completed" || answer_holder== "set"){
        timer_check= "";
        answer_holder= "";
        updateCanvas();
    }
}

function classify_Canvas(){
    classifier.classify(canvas,gotResults);
}

function gotResults(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        drawn_sketch= results[0].label;
        document.getElementById("user_sketch").innerHTML= "Your Sketch: " + drawn_sketch;
        confidence= (results[0].confidence*100).toFixed(2);
        document.getElementById("sketch_confidence").innerHTML= "Confidnce: " + confidence;
    }
}