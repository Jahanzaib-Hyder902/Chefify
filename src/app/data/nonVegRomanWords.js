// src/data/nonVegRomanWords.js
const nonVegRomanWords = [
    "murghi", "gosht", "beef", "mutton", "bakray ka gosht", "gaaye ka gosht", "murghi", "gosht", "beef", "mutton", "bakray ka gosht", "gaaye ka gosht", "chhota gosht", "bara gosht",
    "batakh", "kebab", "qeema", "kaleji", "dil", "gurday", "maghaz", "siri paye", "bater", "khargosh", "anda", 
    "parinday ka gosht", "bater ka gosht", "jheenga", "jheenga fish", "kekra", "seep", "calamari", "octopus", 
    "squid", "salmon fish", "tuna fish", "crab", "seafood", "nihari", "chapli kebab", "koftay", "paye", 
    "siri", "bong", "biryani", "bong gosht", "fish pakora", "machhli", "machhli ka gosht", "fish curry", 
    "seekh kebab", "shami kebab", "mutton chops", "beef roast", "beef steak", "biryani beef", "chapli kebab", 
    "machhli tikka", "fish fry", "bhuna gosht", "fry machhli", "mutton biryani", "beef biryani", "chicken roast", 
    "chicken tikka", "chicken fry", "nihari", "haleem", "machhli curry", "jheenga curry", "murghi handi", 
    "chicken handi", "tikka boti", "chicken qorma", "chicken pulao", "beef pulao", "machhli pulao", 
    "seekh kabab", "mutton kebab", "beef kebab", "nihari paye", "beef nihari", "nihari gosht", "fish fry", 
    "murghi biryani", "gosht curry", "mutton curry", "chicken soup", "beef soup", "fish soup", "mutton stew",
    "chicken stew", "murghi haleem", "beef haleem", "keema fry", "keema curry", "beef keema", "mutton keema",
    "chicken keema", "boti kabab", "barbecue chicken", "beef barbecue", "mutton barbecue", "fried fish", 
    "fried chicken", "grilled chicken", "barbecued fish", "barbecued shrimp", "barbecued lobster", 
    "grilled beef", "grilled mutton", "barbecued quail", "rabbit curry", "bater fry", "bater ka gosht", 
    "quail curry", "rabbit fry", "shrimp curry", "lobster curry", "prawn curry", "seafood curry", 
    "fish masala", "lobster fry", "shrimp fry", "machhli masala", "prawn masala", "fried prawns", 
    "fried shrimps", "prawn biryani", "seafood biryani", "fish biryani", "machhli biryani", "prawn pulao", 
    "machhli pulao", "fish balls", "fish cutlets", "shrimp cutlets", "fish kebabs", "prawn kebabs", 
    "crab curry", "jheenga fry", "machhli roast", "lobster roast", "prawn roast", "jheenga pulao", 
    "crab biryani", "crab fry", "lobster biryani", "lobster fry", "crab fry", "tandoori chicken", 
    "tandoori murghi", "tandoori machhli", "tandoori fish", "mutton handi", "boti handi", "mutton tikka",
    "beef handi", "boti handi", "beef seekh", "mutton seekh", "mutton boti", "tandoori chicken boti", 
    "fried prawns", "fried machhli", "tandoori prawns", "grilled prawns", "fish tikka", "mutton ribs", 
    "beef ribs", "mutton karahi", "gosht karahi", "beef karahi", "machhli karahi", "jheenga karahi", 
    "crab karahi", "lobster karahi", "bater biryani", "rabbit biryani", "fish kababs", "fish kofta", 
    "beef kofta", "mutton kofta", "chicken kofta", "fish cake", "crab cake", "shrimp cake", "fish sticks", 
    "prawn sticks", "grilled fish sticks", "fried fish sticks", "shrimp risotto", "fish risotto", 
    "lobster risotto", "prawn risotto", "fried lobster", "grilled lobster", "fried shrimp", "jheenga masala", "chicken", "meat", "beef", "mutton", "lamb", "pork", "turkey", "duck", "kebab", "minced meat",
  "liver", "heart", "kidneys", "brain", "fish", "prawns", "shrimp", "crab", "lobster", "clams",
  "calamari", "octopus", "squid", "salmon", "tuna", "bacon", "sausage", "ham", "steak", "goat",
  "venison", "quail", "rabbit", "sardines", "anchovy", "swordfish", "oyster", "herring", "eel",
  "snapper", "shark", "trout", "wings", "grouper", "mussels", "pike", "scallops", "perch", "roe",
  "whale", "swordfish", "turbot", "pigeon", "bison", "buffalo", "kangaroo", "boar", "pheasant",
  "elk", "deer", "ostrich", "partridge", "emu", "frog", "lark", "reindeer", "gizzard", "calves",
  "drumsticks", "brisket", "ribs", "ribeye", "sirloin", "tenderloin", "neckbones", "trotters", 
  "suckling pig", "veal", "tri-tip", "bison", "sausage links", "country ham", "gammon", "beef tongue",
  "lamb shank", "duck breast", "foie gras", "venison sausage", "oxtail", "ox liver", "fish roe", 
  "snapper", "sole", "wahoo", "monkfish", "black pudding", "blood sausage", "sweetbreads", "milt",
  "tripe", "goose", "quail eggs", "quail meat", "bone marrow", "hock", "corned beef", "pastrami",
  "biltong", "jerky", "lamb cutlets", "lamb chops", "rack of lamb", "chicken wings", "duck liver",
  "pheasant breasts", "squirrel", "calamari rings", "prawns cocktail", "sea urchin", "basa", "tilapia",
  "halibut", "barramundi", "catfish", "cuttlefish", "coley", "haddock", "pollock", "anglerfish",
  "lobster tails", "king prawns", "red snapper", "hake", "skate", "bream", "mullet", "yellowtail", 
  "porgy", "gurnard", "dogfish", "clams casino", "razor clams", "manila clams", "bay scallops", 
  "geoduck", "shark fin", "frog legs", "rattlesnake", "iguana", "rabbit stew", "alligator meat",
  "venison jerky", "ostrich burgers", "duck hearts", "pigeon breasts", "smoked eel", "herring roe", 
  "fish steaks", "red mullet", "black grouper", "yellowfin tuna", "salmon steaks", "halibut fillet", 
  "marlin", "crawfish", "soft-shell crab", "mud crab", "blue crab", "stone crab", "scampi", "langoustine",
  "crayfish", "dungeness crab", "lobster bisque", "crab cakes", "clam chowder", "oysters Rockefeller", 
  "shucked oysters", "half shell oysters", "raw bar", "prawn bisque", "prawn tempura", "soft-shell lobster",
  "fish soup", "fish broth", "beef broth", "chicken broth", "bone broth", "goulash", "t-bone steak",
  "porterhouse steak", "rump steak", "rib steak", "tomahawk steak", "strip steak", "hanger steak", 
  "flank steak", "beef ribs", "lamb ribs", "short ribs", "baby back ribs", "spare ribs", "cured ham",
  "smoked ham", "country style ribs", "beef stew", "lamb stew", "goat stew", "chicken stew", "rabbit stew",
  "alligator stew", "turtle soup", "snail soup", "fish pie", "beef pie", "steak pie", "chicken pot pie",
  "rabbit pie", "duck pie", "venison pie", "frog pie", "shrimp cocktail", "shrimp scampi", "shrimp boil",
  "gumbo", "jambalaya", "paella", "ceviche", "sashimi", "sushi", "tempura", "poke", "crab claws", 
  "shrimp platter", "lobster platter", "shellfish platter", "seafood platter", "mussels marinara",
  "clam sauce", "oyster sauce", "fish sauce", "shrimp fried rice", "fried fish", "fried chicken", 
  "chicken tenders", "buffalo wings", "grilled chicken", "grilled fish", "grilled prawns", "grilled steak",
  "grilled lamb", "grilled ribs", "barbecued ribs", "barbecue chicken", "barbecued steak", "smoked salmon", 
  "smoked herring", "smoked trout", "smoked tuna", "smoked mackerel", "salmon roe", "tuna roe", 
  "farmed fish", "wild-caught fish", "steamed fish", "steamed lobster", "steamed prawns", "boiled shrimp", 
  "boiled lobster", "boiled crab", "fried calamari", "fried oysters", "fried fish cakes", "fish fingers",
  "fish sticks", "fish patties", "crab patties", "lobster patties", "salmon patties", "tuna patties",
  "smoked eel", "fried eel", "eel sushi", "bbq eel", "eel stew", "eel soup", "catfish nuggets", 
  "grilled catfish", "fried catfish", "fried shrimp", "popcorn shrimp", "shrimp skewers", "grilled shrimp",
  "butter garlic shrimp", "shrimp pasta", "seafood pasta", "shrimp risotto", "seafood risotto", 
  "clam risotto", "oyster risotto", "tuna pasta", "lobster pasta", "seafood pizza", "shrimp pizza", 
  "tuna pizza", "anchovy pizza", "calamari pizza", "clam pizza", "lobster pizza", "fish tacos", 
  "shrimp tacos", "lobster tacos", "crab tacos", "fish burrito", "shrimp burrito", "prawn stir-fry", 
  "crab stir-fry", "lobster stir-fry", "seafood stir-fry", "calamari stir-fry", "shrimp stir-fry", 
  "fish curry", "prawn curry", "shrimp curry", "crab curry", "lobster curry", "seafood curry", 
  "fish soup", "shrimp soup", "prawn soup", "clam soup", "lobster bisque", "fish stock", "fish stew", 
  "shrimp gumbo", "shrimp jambalaya", "prawn etouffee", "shrimp bisque", "prawn cakes", "crab fritters",
  "fish fritters", "lobster fritters", "shrimp fritters", "shrimp egg rolls", "shrimp spring rolls",
  "shrimp dumplings", "shrimp wontons", "shrimp gyoza", "shrimp toast", "shrimp dim sum", "shrimp shumai", "kukkar", "kabooter", "churia", "murga" , "murgha", "murgi"// ... (add the rest of your words here)
  ];
  
  export default nonVegRomanWords;
  