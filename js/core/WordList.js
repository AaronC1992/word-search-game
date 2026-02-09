/**
 * WordList - Provides word database for puzzle generation
 * Contains categorized word lists similar to Unity version
 */
class WordList {
    static shortWords = [
        "CAT", "DOG", "SUN", "MOON", "STAR", "TREE", "BIRD", "FISH",
        "BOOK", "LAMP", "DESK", "CHAIR", "DOOR", "WALL", "ROOF", "FIRE",
        "WATER", "EARTH", "WIND", "RAIN", "SNOW", "CLOUD", "STORM", "WAVE",
        "ROCK", "SAND", "GOLD", "IRON", "WOOD", "LEAF", "ROOT", "SEED",
        "FLOWER", "GRASS", "PLANT", "VINE", "FRUIT", "BERRY", "APPLE", "PEAR",
        "LEMON", "MELON", "GRAPE", "PEACH", "PLUM", "DATE", "FIG", "KIWI",
        "BEAR", "WOLF", "DEER", "MOOSE", "EAGLE", "HAWK", "DOVE", "SWAN",
        "DUCK", "GOOSE", "CROW", "RAVEN", "ROBIN", "WREN", "FINCH", "LARK",
        // Animals
        "FOX", "OWL", "BAT", "RAT", "BEE", "ANT", "FLY", "MOTH", "FROG", "TOAD",
        "CRAB", "CLAM", "SEAL", "LION", "TIGER", "LYNX", "MOLE", "HARE", "BOAR",
        // Nature
        "HILL", "LAKE", "POND", "CAVE", "PATH", "ROSE", "LILY", "FERN", "MOSS", "SAGE",
        "PINE", "PALM", "BUSH", "HERB", "WEED", "STEM", "TWIG", "BARK", "PETAL", "BUD",
        // Objects
        "KEY", "PEN", "CUP", "JAR", "BOX", "BAG", "HAT", "COAT", "SHOE", "RING",
        "BELL", "DRUM", "FLUTE", "HORN", "PIPE", "ROPE", "NET", "SAIL", "MAST", "HELM",
        "AXE", "BOW", "ORB", "GEM", "MAP", "FLAG", "TENT", "TORCH", "COIN", "CHEST",
        // Elements & Materials
        "ICE", "CLAY", "SALT", "JADE", "ZINC", "LEAD", "TIN", "COAL", "OIL", "WAX",
        "SILK", "WOOL", "HIDE", "BONE", "HORN", "SHELL", "SCALE", "FUR", "CLAW", "WING",
        // Food & Drink
        "BREAD", "MEAT", "RICE", "CORN", "BEAN", "SOUP", "STEW", "PIE", "CAKE", "TART",
        "MILK", "WINE", "BEER", "TEA", "JUICE", "CIDER", "HONEY", "JAM", "SPICE", "HERB",
        // Colors
        "RED", "BLUE", "GREEN", "PINK", "GRAY", "BROWN", "BLACK", "WHITE", "GOLD", "SILVER",
        // Time & Weather
        "DAY", "WEEK", "YEAR", "DAWN", "DUSK", "NIGHT", "MIST", "FOG", "HAIL", "FROST",
        // Actions
        "RUN", "JUMP", "SWIM", "WALK", "CLIMB", "LEAP", "DIVE", "SOAR", "GLIDE", "ROLL",
        // More Animals
        "WASP", "NEWT", "SHRIMP", "SHARK", "ROOK", "KITE", "HERON", "CRANE", "STORK", "IBIS",
        "VIPER", "ADDER", "COBRA", "GECKO", "SKUNK", "PUMA", "JAGUAR", "ORCA", "BISON", "YAK",
        // More Nature
        "CREEK", "GROVE", "GLADE", "FIELD", "SHORE", "CLIFF", "PEAKS", "DUNE", "OASIS", "DELTA",
        "FLORA", "FAUNA", "REEDS", "KELP", "LOTUS", "ORCHID", "TULIP", "PANSY", "DAISY", "ASTER",
        // More Objects
        "BLADE", "SHAFT", "HILT", "LANCE", "BATON", "CANE", "BASIN", "VASE", "BOWL", "PLATE",
        "SPOON", "FORK", "KNIFE", "LADLE", "WHISK", "SIEVE", "TONGS", "RACK", "SHELF", "CRATE",
        "LOCK", "LATCH", "HINGE", "SCREW", "NAIL", "BOLT", "CLAMP", "VICE", "LEVER", "CRANK",
        // More Materials
        "BRASS", "STEEL", "STONE", "BRICK", "GLASS", "CHALK", "RESIN", "PITCH", "LATEX", "AMBER",
        "FLINT", "SLATE", "SHALE", "QUARTZ", "MICA", "TALC", "GYPSUM", "BORAX", "SODA", "LIME",
        // More Food
        "SALAD", "GRAVY", "SAUCE", "BROTH", "STOCK", "CREAM", "CRUST", "DOUGH", "BATTER", "ICING",
        "SUGAR", "SYRUP", "CANDY", "FUDGE", "COCOA", "MOCHA", "LATTE", "BREW", "TOAST", "BAGEL",
        // Activities & Concepts
        "GAME", "PLAY", "SPORT", "RACE", "MATCH", "QUEST", "TRIAL", "TEST", "ARTS", "CRAFT",
        "SKILL", "TRADE", "TOOLS", "IDEAS", "DREAM", "HOPE", "FAITH", "TRUST", "PEACE", "UNITY",
        // More varied words
        "YARN", "BEAD", "LACE", "TRIM", "FRINGE", "BUTTON", "CLASP", "BUCKLE", "RIVET", "STUD",
        "PIANO", "BANJO", "LUTE", "HARP", "SITAR", "GUITAR", "OBOE", "TUBA", "VIOLA", "CELLO",
        "COMET", "NEBULA", "PULSAR", "NOVA", "GIANT", "VOID", "FLUX", "WARP", "ORBIT", "LUNAR",
        "CHEF", "CLERK", "GUARD", "PILOT", "RIDER", "MINER", "BAKER", "TAILOR", "WEAVER", "NURSE",
        "SCARF", "GLOVE", "SASH", "SHAWL", "CLOAK", "ROBE", "TUNIC", "GOWN", "SKIRT", "VEST",
        "SPIRE", "VAULT", "CRYPT", "TOMB", "GRAVE", "RUINS", "RELIC", "SHARD", "FOSSIL", "SLATE",
        "WAGON", "CART", "SLEIGH", "SLED", "RAFT", "BARGE", "YACHT", "CANOE", "KAYAK", "FERRY",
        "NOBLE", "SAGE", "ELDER", "YOUTH", "GIANT", "DWARF", "ELF", "TROLL", "FAIRY", "PIXIE",
        "CURSE", "BLESS", "WARD", "BIND", "SEAL", "MARK", "BRAND", "SCAR", "RUNE", "SIGIL",
        // Music & Arts
        "SONG", "TUNE", "NOTE", "BEAT", "RIFF", "CHORD", "LYRIC", "VERSE", "CHANT", "HYMN",
        "PAINT", "DRAW", "INK", "DYE", "HUE", "TONE", "SHADE", "TINT", "GLOW", "GLEAM",
        // Body & Health
        "BONE", "SKIN", "VEIN", "PULSE", "HEART", "LUNG", "LIVER", "SPINE", "NERVE", "BRAIN",
        // Weather & Sky
        "GUST", "GALE", "SLEET", "SMOG", "HAZE", "THAW", "FLOOD", "DROUGHT", "SQUALL", "BOLT",
        // Buildings & Rooms
        "HALL", "ARCH", "DOME", "GATE", "MOAT", "PIER", "DOCK", "BARN", "SHED", "MILL",
        "ATTIC", "CELLAR", "PORCH", "FOYER", "NOOK", "DEN", "LOFT", "WING", "WARD", "KEEP",
        // Terrain
        "RIDGE", "KNOLL", "BLUFF", "GORGE", "MARSH", "BOG", "FEN", "MOOR", "GLEN", "VALE",
        // Misc
        "QUILL", "SCROLL", "STAFF", "WAND", "CHARM", "PRISM", "GLOBE", "DIAL", "GAUGE", "KNOB"
    ];

    static mediumWords = [
        "PYTHON", "COFFEE", "GUITAR", "PLANET", "ROCKET", "GARDEN", "CASTLE", "BRIDGE",
        "FOREST", "OCEAN", "RIVER", "MOUNTAIN", "VALLEY", "DESERT", "ISLAND", "JUNGLE",
        "WINTER", "SPRING", "SUMMER", "AUTUMN", "SEASON", "HARVEST", "BLOSSOM", "RAINBOW",
        "THUNDER", "LIGHTNING", "TORNADO", "VOLCANO", "EARTHQUAKE", "GLACIER", "ICEBERG",
        "CRYSTAL", "DIAMOND", "EMERALD", "SAPPHIRE", "RUBY", "TOPAZ", "AMBER", "PEARL",
        "DRAGON", "PHOENIX", "UNICORN", "GRIFFIN", "KNIGHT", "WIZARD", "WARRIOR", "RANGER",
        "ARCHER", "SHIELD", "SWORD", "ARMOR", "HELMET", "CROWN", "THRONE", "KINGDOM",
        "EMPIRE", "PALACE", "TEMPLE", "TOWER", "FORTRESS", "CITADEL", "DUNGEON", "TAVERN",
        "ADVENTURE", "JOURNEY", "QUEST", "TREASURE", "MYSTERY", "SECRET", "LEGEND", "MYTH",
        "COURAGE", "HONOR", "JUSTICE", "FREEDOM", "WISDOM", "POWER", "MAGIC", "SPIRIT",
        // Additional Animals
        "RABBIT", "SQUIRREL", "BEAVER", "OTTER", "BADGER", "FERRET", "WEASEL", "MARTEN",
        "TURTLE", "LIZARD", "SNAKE", "SPIDER", "BEETLE", "WASP", "HORNET", "MANTIS",
        "CRICKET", "DRAGONFLY", "BUTTERFLY", "FIREFLY", "DOLPHIN", "WHALE", "SHARK",
        "SALMON", "TROUT", "BASS", "PERCH", "CATFISH", "PARROT", "FALCON", "CONDOR",
        "PELICAN", "HERON", "STORK", "CRANE", "IBIS", "PENGUIN", "PUFFIN", "SEAGULL",
        "ALBATROSS", "OSTRICH", "PEACOCK", "PHEASANT", "MONKEY", "LEMUR", "SLOTH",
        "KOALA", "PANDA", "RACCOON", "OPOSSUM", "ARMADILLO", "COYOTE", "JACKAL",
        // Nature & Plants
        "WILLOW", "MAPLE", "BIRCH", "ASPEN", "SPRUCE", "CEDAR", "REDWOOD", "BAMBOO",
        "ORCHID", "TULIP", "DAISY", "POPPY", "VIOLET", "JASMINE", "LAVENDER", "HEATHER",
        "CLOVER", "THISTLE", "NETTLE", "BRACKEN", "MUSHROOM", "LICHEN", "ALGAE", "CORAL",
        "CANYON", "BEACH", "MEADOW", "GROVE", "STREAM", "PRAIRIE", "TUNDRA", "SWAMP",
        // Minerals & Materials
        "MARBLE", "GRANITE", "QUARTZ", "ONYX", "OPAL", "BRONZE", "COPPER", "PLATINUM",
        "TITANIUM", "OBSIDIAN", "FLINT", "SLATE", "CHALK", "GRAVEL", "PUMICE",
        // Weather & Sky
        "SUNRISE", "SUNSET", "TWILIGHT", "STARLIGHT", "MOONLIGHT", "ECLIPSE", "METEOR",
        "COMET", "NEBULA", "AURORA", "BLIZZARD", "HURRICANE", "TYPHOON", "DRIZZLE",
        "SHOWER", "MONSOON", "BREEZE", "GALE", "TEMPEST", "CYCLONE", "HAILSTORM",
        // Objects & Tools
        "HAMMER", "CHISEL", "ANVIL", "FORGE", "FURNACE", "LOOM", "SPINDLE", "SHUTTLE",
        "NEEDLE", "SCISSORS", "THREAD", "FABRIC", "CANVAS", "EASEL", "BRUSH", "PALETTE",
        "LANTERN", "CANDLE", "BEACON", "MIRROR", "LENS", "PRISM", "COMPASS", "SEXTANT",
        "ANCHOR", "RUDDER", "PADDLE", "SADDLE", "HARNESS", "BRIDLE", "STIRRUP",
        "DAGGER", "GAUNTLET", "GREAVES", "QUIVER", "ARROW", "LANCE", "SPEAR", "MACE",
        "STAFF", "WAND", "SCROLL", "TOME", "GRIMOIRE", "CODEX", "TABLET", "RELIC",
        // Food & Cooking
        "CHEESE", "BUTTER", "CREAM", "YOGURT", "SUGAR", "FLOUR", "YEAST", "BAKING",
        "ROASTING", "GRILLING", "STEAMING", "BOILING", "FRYING", "CINNAMON", "PEPPER",
        "GINGER", "GARLIC", "ONION", "BASIL", "THYME", "OREGANO", "CHICKEN", "TURKEY",
        "SHRIMP", "LOBSTER", "OYSTER", "MUSSEL", "NOODLES", "PASTA", "BREAD", "WAFFLE",
        // Places
        "MARKET", "VILLAGE", "HARBOR", "LIGHTHOUSE", "WINDMILL", "FOUNTAIN", "LIBRARY",
        "MUSEUM", "THEATER", "GALLERY", "STUDIO", "WORKSHOP", "FACTORY", "BAKERY",
        "SCHOOL", "CHURCH", "SHRINE", "MONASTERY", "COTTAGE", "MANSION", "CAVERN",
        "CHAMBER", "PORTAL", "GATEWAY", "SANCTUARY", "OUTPOST", "SETTLEMENT", "CITADEL",
        // Fantasy & Magic
        "POTION", "ELIXIR", "CHARM", "SPELL", "RUNE", "GLYPH", "SIGIL", "AMULET",
        "TALISMAN", "ARTIFACT", "PROPHECY", "SORCERY", "ENCHANTMENT", "ILLUSION",
        "PHANTOM", "SPECTER", "WRAITH", "GOLEM", "GARGOYLE", "CHIMERA", "HYDRA",
        // More Nature & Geography
        "WETLAND", "WOODLAND", "HIGHLAND", "LOWLAND", "PLATEAU", "RAVINE", "GULLY",
        "FJORD", "LAGOON", "ESTUARY", "CHANNEL", "STRAIT", "BASIN", "RANGE", "SUMMIT",
        "FOOTHILL", "HILLSIDE", "SEASIDE", "LAKESIDE", "RIVERSIDE", "SHORELINE",
        // More Animals
        "GAZELLE", "ANTELOPE", "BUFFALO", "CARIBOU", "REINDEER", "WALRUS", "MANATEE",
        "NARWHAL", "HAMSTER", "GERBIL", "GUINEA", "CHINCHILLA", "MEERKAT", "WOMBAT",
        "VULTURE", "BUZZARD", "KESTREL", "SPARROW", "THRUSH", "WARBLER", "MAGPIE",
        "BLUEJAY", "CARDINAL", "CANARY", "MACAW", "TOUCAN", "HORNBILL", "HOOPOE",
        // More Objects & Tools
        "BUCKET", "BARREL", "CANTEEN", "FLASK", "GOBLET", "CHALICE", "PITCHER",
        "KETTLE", "CAULDRON", "CRUCIBLE", "MORTAR", "PESTLE", "GRINDER", "CRUSHER",
        "PLIERS", "WRENCH", "SCRAPER", "SHOVEL", "PICKAXE", "TROWEL", "RAKE",
        "SICKLE", "SCYTHE", "PITCHFORK", "CROWBAR", "PULLEY", "WINCH", "HOIST",
        // More Structures
        "ARCHWAY", "DOORWAY", "HALLWAY", "PATHWAY", "ROADWAY", "STAIRWAY", "GATEWAY",
        "BALCONY", "TERRACE", "VERANDA", "GAZEBO", "PERGOLA", "ARBOR", "TRELLIS",
        "PILLAR", "COLUMN", "STATUE", "MONUMENT", "MEMORIAL", "SHRINE", "ALTAR",
        // More Materials & Substances
        "ENAMEL", "VARNISH", "LACQUER", "POLISH", "GLAZE", "STAIN", "PIGMENT",
        "CARBON", "SULFUR", "SILICON", "ALUMINUM", "MERCURY", "ARGON", "NEON",
        "HELIUM", "RADON", "XENON", "KRYPTON", "NICKEL", "COBALT", "CHROMIUM",
        // More Food & Drink
        "MUFFIN", "BISCUIT", "CRACKER", "PRETZEL", "COOKIE", "BROWNIE", "SCONE",
        "PUDDING", "CUSTARD", "SORBET", "GELATO", "MOUSSE", "TRUFFLE", "CARAMEL",
        "NOUGAT", "TOFFEE", "PRALINE", "GANACHE", "FONDUE", "CASSEROLE", "LASAGNA",
        // More Concepts & Qualities
        "BALANCE", "HARMONY", "RHYTHM", "MELODY", "SYMPHONY", "CHORUS", "ANTHEM",
        "VICTORY", "TRIUMPH", "GLORY", "VALOR", "BRAVERY", "PROWESS", "STRENGTH",
        "AGILITY", "STAMINA", "VITALITY", "ENERGY", "ESSENCE", "NATURE", "SPIRIT",
        // Additional medium words  
        "SCARLET", "CRIMSON", "MAGENTA", "VIOLET", "INDIGO", "TURQUOISE", "AZURE",
        "FIGHTER", "BRAWLER", "DUELIST", "SOLDIER", "CAPTAIN", "GENERAL", "ADMIRAL",
        "ORACLE", "PROPHET", "MYSTIC", "HERMIT", "MENTOR", "SCHOLAR", "ARTISAN",
        "CITRUS", "MANGO", "PAPAYA", "GUAVA", "LYCHEE", "PASSION", "KIWIFRUIT",
        "PASTRY", "DANISH", "STRUDEL", "TURNOVER", "FRITTER", "DONUT", "ECLAIR",
        "GARNET", "AMETHYST", "PERIDOT", "ZIRCON", "JASPER", "AGATE", "CARNELIAN",
        "TIMBER", "LUMBER", "PLANK", "BEAM", "JOIST", "RAFTER", "PANEL",
        "ENGINE", "PISTON", "VALVE", "SPRING", "BEARING", "AXLE", "SHAFT",
        "SERPENT", "WYVERN", "BASILISK", "DRAKE", "BEHEMOTH", "LEVIATHAN", "KRAKEN",
        "SHADOW", "TWILIGHT", "MIDNIGHT", "DAYBREAK", "SUNDOWN", "NIGHTFALL", "DAWNLIGHT",
        "GEYSER", "GROTTO", "QUARRY", "GORGE", "SUMMIT", "RIDGE", "CREST",
        "JEWEL", "TRINKET", "HEIRLOOM", "KEEPSAKE", "ANTIQUE", "ARTIFACT", "CURIO",
        "RAMPART", "PARAPET", "BASTION", "BULWARK", "STOCKADE", "PALISADE", "BATTLEMENT",
        // Professions & Roles
        "MERCHANT", "SURGEON", "CHEMIST", "SCULPTOR", "PAINTER", "DANCER", "SINGER",
        "BREWER", "TANNER", "POTTER", "MASON", "THATCHER", "COBBLER", "CHANDLER",
        "FALCONER", "FORESTER", "WARDEN", "MARSHAL", "HERALD", "ENVOY", "EMISSARY",
        // Science & Tech
        "VOLTAGE", "CURRENT", "CIRCUIT", "MAGNET", "PHOTON", "PROTON", "NEUTRON",
        "ELEMENT", "COMPOUND", "MIXTURE", "SOLVENT", "REAGENT", "CATALYST", "POLYMER",
        "CRYSTAL", "MINERAL", "GEODE", "FOSSIL", "METEOR", "ASTEROID", "COMET",
        // Music & Performance
        "SONATA", "BALLAD", "MINUET", "WALTZ", "FUGUE", "REQUIEM", "OVERTURE",
        "CONCERT", "RECITAL", "QUARTET", "SOLOIST", "MAESTRO", "IMPROV", "ENCORE",
        // Textiles & Clothing
        "SATIN", "VELVET", "DENIM", "LINEN", "COTTON", "FLANNEL", "MUSLIN",
        "BODICE", "CORSET", "BONNET", "TURBAN", "SANDAL", "GAITER", "MANTLE",
        // Nautical
        "CAPTAIN", "SAILOR", "VOYAGE", "CRUISE", "MARINA", "LAGOON", "HARBOUR",
        "GALLEY", "FRIGATE", "CORVETTE", "CLIPPER", "SCHOONER", "GALLEON", "BRIGANTINE",
        // Emotions & States
        "SORROW", "DELIGHT", "WONDER", "ANGUISH", "ECSTASY", "FERVOR", "PASSION",
        "SERENITY", "COMFORT", "SOLACE", "RESPITE", "REVERIE", "RAPTURE", "ELATION",
        // Architecture
        "TURRET", "CUPOLA", "MINARET", "STEEPLE", "BELFRY", "BUTTRESS", "CLOISTER",
        "COURTYARD", "CORRIDOR", "GALLERY", "ROTUNDA", "PAVILION", "COLONNADE", "PORTICO",
        // Cooking & Baking
        "SIMMER", "BLANCH", "BRAISE", "SAUTEE", "MARINATE", "POACH", "JULIENNE",
        "TARTLET", "GALETTE", "BRIOCHE", "BAGUETTE", "FOCACCIA", "CIABATTA", "SOURDOUGH",
        // Mythology
        "CENTAUR", "MINOTAUR", "CERBERUS", "PEGASUS", "MEDUSA", "CYCLOPS", "TITAN",
        "VALKYRIE", "BANSHEE", "SPHINX", "MANTICORE", "GRIFFIN", "FENRIR", "SLEIPNIR"
    ];

    static longWords = [
        "BUTTERFLY", "WATERFALL", "SUNFLOWER", "STRAWBERRY", "BLUEBERRY", "RASPBERRY",
        "CROCODILE", "DINOSAUR", "ELEPHANT", "GIRAFFE", "KANGAROO", "PENGUIN", "OCTOPUS",
        "CHAMPION", "VICTORY", "TRIUMPH", "CONQUEST", "BATTLE", "GUARDIAN",
        "ADVENTURE", "DISCOVERY", "EXPLORATION", "EXPEDITION", "JOURNEY", "ODYSSEY",
        "TELESCOPE", "MICROSCOPE", "CALCULATOR", "COMPUTER", "TELEVISION", "TELEPHONE",
        "WONDERFUL", "BEAUTIFUL", "LIGHTHOUSE", "KEYBOARD", "RAINBOW", "DRAGONFLY",
        "CHAMPIONSHIP", "CELEBRATION", "IMAGINATION", "INSPIRATION", "TRANSFORMATION",
        "CONSTELLATION", "REVOLUTION", "EVOLUTION", "CIVILIZATION", "GENERATION",
        "EXTRAORDINARY", "MAGNIFICENT", "SPECTACULAR", "INCREDIBLE", "REMARKABLE",
        // Nature & Animals
        "HUMMINGBIRD", "WOODPECKER", "KINGFISHER", "NIGHTINGALE", "MOCKINGBIRD",
        "RATTLESNAKE", "SALAMANDER", "GRASSHOPPER", "CATERPILLAR", "BUMBLEBEE",
        "LADYBUG", "SCORPION", "TARANTULA", "CHAMELEON", "ALLIGATOR", "BARRACUDA",
        "SWORDFISH", "JELLYFISH", "STARFISH", "SEAHORSE", "CHIMPANZEE", "ORANGUTAN",
        "GORILLA", "BABOON", "RHINOCEROS", "HIPPOPOTAMUS", "LEOPARD", "CHEETAH",
        "PANTHER", "JAGUAR", "PORCUPINE", "HEDGEHOG", "PLATYPUS", "WALRUS",
        // Plants & Nature
        "CARNATION", "MAGNOLIA", "CHRYSANTHEMUM", "RHODODENDRON", "DANDELION",
        "BUTTERCUP", "SNAPDRAGON", "MARIGOLD", "HYACINTH", "DAFFODIL", "GERANIUM",
        "HONEYSUCKLE", "WILDFLOWER", "EVERGREEN", "SYCAMORE", "EUCALYPTUS",
        "SEQUOIA", "MAGNOLIA", "MISTLETOE", "PINEAPPLE", "POMEGRANATE",
        "BLACKBERRY", "CRANBERRY", "GOOSEBERRY", "BOYSENBERRY", "MULBERRY",
        // Geography
        "AVALANCHE", "HURRICANE", "THUNDERSTORM", "WHIRLPOOL", "QUICKSAND",
        "ARCHIPELAGO", "PENINSULA", "PLATEAU", "SAVANNA", "RAINFOREST",
        "WILDERNESS", "COUNTRYSIDE", "UNDERGROUND", "UNDERGROUND", "BATTLEFIELD",
        "MARKETPLACE", "CROSSROADS", "BORDERLAND", "WASTELAND", "HOMELAND",
        // Fantasy & Adventure
        "SORCERER", "ENCHANTER", "CONJURER", "NECROMANCER", "ALCHEMIST",
        "PALADIN", "CRUSADER", "GLADIATOR", "MERCENARY", "ASSASSIN",
        "SPELLBOOK", "SPELLCASTER", "ENCHANTRESS", "SORCERESS", "PRIESTESS",
        "LABYRINTH", "CATACOMB", "STRONGHOLD", "WATCHTOWER", "DRAWBRIDGE",
        "UNDERWORLD", "SHADOWLAND", "FAIRYLAND", "WONDERLAND", "NEVERLAND",
        "DRAGONFIRE", "MOONSTONE", "SUNSTONE", "BLOODSTONE", "LODESTONE",
        "THUNDERBOLT", "FIRESTORM", "ICESTORM", "WINDSTORM", "SANDSTORM",
        // Objects & Technology
        "HOURGLASS", "TELESCOPE", "BINOCULARS", "MAGNIFYING", "PENDULUM",
        "PARACHUTE", "STEAMBOAT", "SAILBOAT", "ROWBOAT", "WARSHIP",
        "BATTLESHIP", "FLAGSHIP", "STEAMSHIP", "AIRSHIP", "STARSHIP",
        "CATAPULT", "BALLISTA", "TREBUCHET", "CROSSBOW", "LONGBOW",
        "BROADSWORD", "SCIMITAR", "CLAYMORE", "RAPIER", "CUTLASS",
        "BATTLEAXE", "WARHAMMER", "FLAIL", "HALBERD", "TRIDENT",
        // Concepts & Qualities
        "LEGENDARY", "MYTHICAL", "MAGICAL", "MYSTICAL", "POWERFUL",
        "GLORIOUS", "RADIANT", "BRILLIANT", "LUMINOUS", "MAJESTIC",
        "MYSTERIOUS", "DANGEROUS", "TREACHEROUS", "FEARLESS", "DAUNTLESS",
        "RELENTLESS", "UNSTOPPABLE", "INVINCIBLE", "IMMORTAL", "ETERNAL",
        "HARMONIOUS", "MELODIOUS", "VICTORIOUS", "COURAGEOUS", "ADVENTUROUS",
        "MARVELOUS", "FABULOUS", "FANTASTIC", "ENCHANTED", "BEWITCHED",
        // Structures & Places
        "CATHEDRAL", "AMPHITHEATER", "COLOSSEUM", "PYRAMID", "MONUMENT",
        "SANCTUARY", "OBSERVATORY", "PLANETARIUM", "AQUARIUM", "TERRARIUM",
        "GREENHOUSE", "WAREHOUSE", "GUARDHOUSE", "BARRACKS", "INFIRMARY",
        "ARMORY", "TREASURY", "GRANARY", "STABLES", "SMITHY",
        "VINEYARD", "ORCHARD", "FARMHOUSE", "HOMESTEAD", "PLANTATION",
        // Additional long words
        "BLACKSMITH", "GOLDSMITH", "SILVERSMITH", "LOCKSMITH", "WORDSMITH",
        "ADVENTURE", "MISADVENTURE", "MISFORTUNE", "WANDERLUST", "EXPEDITION",  
        "CONSTELLATION", "PLANETARIUM", "OBSERVATORY", "TELESCOPE", "ASTRONOMER",
        "WINDMILL", "WATERMILL", "SAWMILL", "GRISTMILL", "TREADMILL",
        "ORCHESTRA", "SYMPHONY", "HARMONIZE", "CRESCENDO", "FORTISSIMO",
        "ARCHITECT", "BLUEPRINT", "FOUNDATION", "STRUCTURE", "FRAMEWORK",
        "CARTOGRAPHER", "NAVIGATOR", "EXPLORER", "PATHFINDER", "TRAILBLAZER",
        "ALCHEMIST", "APOTHECARY", "HERBALIST", "BOTANIST", "NATURALIST",
        "WILDERNESS", "LANDSCAPE", "PANORAMA", "WATERFALL", "RIVERBANK",
        "DRAGONFLY", "BUTTERFLY", "GRASSHOPPER", "BUMBLEBEE", "LADYBUG",
        // More Structures & Places
        "CLOCKTOWER", "DRAWBRIDGE", "GATEHOUSE", "GUARDTOWER", "COURTHOUSE",
        "TOWNHOUSE", "FARMSTEAD", "MONASTERY", "CATHEDRAL", "COLOSSEUM",
        "GRAVEYARD", "CEMETERY", "CHURCHYARD", "COURTYARD", "STOCKYARD",
        // Epic Words
        "THUNDERCLAP", "EARTHQUAKE", "WHIRLWIND", "FIREBRAND", "IRONCLAD",
        "NIGHTSHADE", "QUICKSILVER", "STORMCHASER", "CLOUDBREAK", "STONEWALL",
        "SHADOWCASTER", "SPELLWEAVER", "SWORDMASTER", "SHIELDMAIDEN", "STORMRIDER",
        // Science & Discovery
        "ATMOSPHERE", "BAROMETER", "PERIMETER", "THERMOMETER", "VOLTMETER",
        "ECOSYSTEM", "BIOSPHERE", "LITHOSPHERE", "STRATOSPHERE", "MAGNETOSPHERE",
        "PHENOMENON", "HYPOTHESIS", "EXPERIMENT", "LABORATORY", "TELESCOPE",
        // Adventure & Exploration
        "CAMPFIRE", "BACKPACK", "COMPASS", "LANTERN", "CANTEEN",
        "HORSEBACK", "CARRIAGE", "STAGECOACH", "STEAMTRAIN", "LOCOMOTIVE",
        "FOOTBRIDGE", "OVERPASS", "UNDERPASS", "CROSSROAD", "MILESTONE",
        // Grand Qualities
        "BREATHTAKING", "ASTONISHING", "CAPTIVATING", "DEVASTATING", "ELECTRIFYING",
        "FORMIDABLE", "RESPLENDENT", "TRANSCENDENT", "UNFORGETTABLE", "UNBREAKABLE",
        "EVERLASTING", "OVERWHELMING", "SPELLBINDING", "HEARTWARMING", "EARTHSHAKING",
        // Professions
        "BLACKSMITH", "SWORDSMITH", "SHIPWRIGHT", "CARTWRIGHT", "PLAYWRIGHT",
        "BEEKEEPER", "GATEKEEPER", "SHOPKEEPER", "INNKEEPER", "TIMEKEEPER",
        "GAMEMASTER", "RINGMASTER", "TASKMASTER", "QUARTERMASTER", "HEADMASTER"
    ];

    /**
     * Get random words for puzzle generation
     * @param {number} count - Number of words needed
     * @param {number} minLength - Minimum word length
     * @param {number} maxLength - Maximum word length
     * @param {number} seed - Random seed for consistency
     * @returns {string[]} Array of selected words
     */
    static getRandomWords(count, minLength, maxLength, seed) {
        const seededRandom = this.createSeededRandom(seed);
        const allEligibleWords = [];

        // Collect eligible words
        [...this.shortWords, ...this.mediumWords, ...this.longWords].forEach(word => {
            if (word.length >= minLength && word.length <= maxLength) {
                allEligibleWords.push(word.toUpperCase());
            }
        });

        // Shuffle using seeded random
        this.shuffleArray(allEligibleWords, seededRandom);

        // Return requested count
        return allEligibleWords.slice(0, Math.min(count, allEligibleWords.length));
    }

    /**
     * Create a seeded random number generator
     * @param {number} seed - Seed value
     * @returns {Function} Random function
     */
    static createSeededRandom(seed) {
        let value = seed;
        return function() {
            value = (value * 9301 + 49297) % 233280;
            return value / 233280;
        };
    }

    /**
     * Shuffle array using Fisher-Yates algorithm
     * @param {Array} array - Array to shuffle
     * @param {Function} randomFn - Random function
     */
    static shuffleArray(array, randomFn) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(randomFn() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
}
