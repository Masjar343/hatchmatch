import { useState, useEffect, useRef, useMemo } from "react";

const DB = [
  // ─── MAYFLIES ────────────────────────────────────────────────────────────
  {
    id:1, order:'mayfly', emoji:'🪲',
    name:'Blue-Winged Olive', latin:'Baetis spp.',
    seasons:['spring','fall','winter'], peakMonths:'Mar–May, Sep–Nov',
    hatchTime:'Midday (overcast preferred)', waterTemp:'40–55°F',
    waterType:'Tailwaters, freestones, spring creeks',
    description:'The Blue-Winged Olive (BWO) is arguably the most important mayfly in North American fly fishing. Color varies significantly: classic BWOs are olive-bodied with slate-gray wings, but they range from dark olive-black in cold winter water to gray-brown or even near-black depending on species and conditions. Match size first — then color. Found across North America and Europe, hatching on cold, overcast days all year.',
    stages:[
      {name:'Nymph',fly:'Pheasant Tail Nymph',sizes:'16–22',colors:['Olive','Brown'],waterLevel:'🪨 Bottom — dead drift near riverbed',desc:'Slender, olive-brown. Active swimmer. Fish near bottom, rising to surface before emergence.'},
      {name:'Emerger',fly:'RS2 / Flashback BWO',sizes:'18–22',colors:['Olive','Gray'],waterLevel:'〰️ Surface film — just below or in the meniscus',desc:'Stuck in shuck at surface film. Most important stage for selective trout.'},
      {name:'Dun',fly:'Parachute Adams / Sparkle Dun',sizes:'16–22',colors:['Olive body','Gray wing'],waterLevel:'🏄 Top water — floating on surface',desc:'Rides surface momentarily before flight. Classic dry fly stage.'},
      {name:'Spinner',fly:'Rusty Spinner',sizes:'18–22',colors:['Rusty','Clear wings'],waterLevel:'🏄 Top water — spent, flush in film',desc:'Spent female falls to surface after egg-laying. Critical in evenings.'}
    ],
    topFlies:[
      {name:'Pheasant Tail Nymph',style:'Nymph',sizes:'16–20',hook:'Standard nymph',confidence:'High',weight:'Beadhead',tip:'Dead drift along bottom. Add a midge dropper in winter. One of the most universally effective nymphs ever tied.',photo:'https://norrik.com/wp-content/uploads/2024/07/pheasant-tail-nymph-small.jpg'},
      {name:'RS2',style:'Emerger',sizes:'18–22',hook:'Standard nymph',confidence:'High',weight:'Unweighted',tip:'Fish in the film on a greased leader. Essential on the South Platte.',photo:'https://norrik.com/wp-content/uploads/2024/07/rs2-emerger-small.jpg'},
      {name:'Flashback BWO',style:'Nymph',sizes:'16–22',hook:'Standard nymph',confidence:'High',weight:'Beadhead',tip:'Flash back triggers strikes in the water column during emergence. Fish on a dead drift 12–18 inches below an indicator. One of the most productive BWO sub-surface patterns.',photo:'https://norrik.com/wp-content/uploads/2024/07/blue-winged-olive-nymph-pattern-small.jpg'},
      {name:'Sparkle Dun (Olive)',style:'Dry',sizes:'18–22',hook:'Dry fly',confidence:'High',weight:'None',tip:'Olive body for classic spring/fall BWOs. Trim wing to match local insects. Shuck trailing in the film seals the deal.',photo:'https://norrik.com/wp-content/uploads/2024/07/sparkle-dun-small.jpg'},
      {name:'Sparkle Dun (Gray/Dark)',style:'Dry',sizes:'18–22',hook:'Dry fly',confidence:'High',weight:'None',tip:'Gray or near-black body for winter BWOs and dark-colored Baetis. On overcast winter days, the darker version often outfishes olive. Always check the naturals.',photo:'https://norrik.com/wp-content/uploads/2024/07/blue-winged-olive-dry-fly-pattern-small.jpg'},
      {name:'Parachute Adams',style:'Dry',sizes:'14–22',hook:'Dry fly',confidence:'High',weight:'None',tip:"The world's most versatile dry fly. Works during BWO, caddis, and midge hatches. Never leave home without it.",photo:'https://norrik.com/wp-content/uploads/2024/07/parachute-adams-small.jpg'},
      {name:'Blue Dun',style:'Dry',sizes:'16–22',hook:'Dry fly',confidence:'High',weight:'None',tip:'One of the oldest trout flies in existence. Blue/gray dun hackle perfectly matches the slate-gray wings of the Baetis dun. Deadly on eastern limestone streams and tailwaters where trout have seen every modern pattern. Fish dead drift on a fine tippet.',photo:'https://norrik.com/wp-content/uploads/2024/07/blue-quill-dry-fly-small.jpg'},
      {name:'Copper John',style:'Nymph',sizes:'14–20',hook:'Standard nymph',confidence:'High',weight:'Tungsten bead',tip:'Heavy wire body sinks fast. Deadly attractor nymph for both stonefly and mayfly imitation. Fish on the point in a two-fly rig.',photo:'https://norrik.com/wp-content/uploads/2024/07/copper-johns-nymph-small.jpg'},
      {name:'Rusty Spinner',style:'Spinner',sizes:'18–22',hook:'Dry fly',confidence:'High',weight:'None',tip:'Fish flat in the film at dusk.',photo:'https://norrik.com/wp-content/uploads/2024/07/rusty-spinner-small.jpg'}
    ]
  },
  {
    id:2, order:'mayfly', emoji:'🪲',
    name:'Pale Morning Dun', latin:'Ephemerella inermis',
    seasons:['spring','summer'], peakMonths:'Jun–Aug',
    hatchTime:'Morning to midday (10am–2pm)', waterTemp:'55–65°F',
    waterType:'Freestones, spring creeks, tailwaters',
    description:'The Pale Morning Dun (PMD) is the signature summer hatch of western trout streams. These pale yellow-olive mayflies hatch in massive numbers on warm summer mornings, producing some of the most technical dry fly fishing of the year.',
    stages:[
      {name:'Nymph',fly:'Hares Ear / PMD Nymph',sizes:'14–18',colors:['Tan','Olive-brown'],waterLevel:'🪨 Bottom — dead drift near riverbed',desc:'Crawler-type nymph. Dislodged easily — effective in riffles.'},
      {name:'Emerger',fly:'Film Critic / Cripple',sizes:'16–18',colors:['Pale yellow','Olive'],waterLevel:'〰️ Surface film — just below or in the meniscus',desc:'Key stage. Trout gorge on stuck emergers. Fish in film with slack leader.'},
      {name:'Dun',fly:'PMD Comparadun',sizes:'14–18',colors:['Pale yellow','Light gray wing'],waterLevel:'🏄 Top water — floating on surface',desc:'Bright pale yellow body, light gray wings.'},
      {name:'Spinner',fly:'PMD Spinner',sizes:'16–18',colors:['Rusty red','Clear wings'],waterLevel:'🏄 Top water — spent, flush in film',desc:'Spinner fall in evenings or early morning.'}
    ],
    topFlies:[
      {name:'PMD Comparadun',style:'Dry',sizes:'14–18',hook:'Dry fly',confidence:'High',weight:'None',tip:'Deer hair wing sits low in film. Perfect for spring creek fish.',photo:'https://norrik.com/wp-content/uploads/2024/07/pmd-parachute-small.jpg'},
      {name:'PMD Nymph',style:'Nymph',sizes:'14–18',hook:'Standard nymph',confidence:'High',weight:'Beadhead',tip:'The PMD nymph is a swimmer — fish it with subtle twitches near the bottom. Tan/amber body with a gold bead. Most productive 30–60 min before the hatch.',photo:'https://norrik.com/wp-content/uploads/2024/07/pmd-dropper-nymph-small.jpg'},
      {name:'Film Critic',style:'Emerger',sizes:'16–18',hook:'Dry fly',confidence:'High',weight:'None',tip:'Designed specifically for PMD emergences on spring creeks. CDC wing trapped in the film imitates a stuck emerger perfectly. Deadly on pressured fish that have seen every parachute pattern.',photo:'https://norrik.com/wp-content/uploads/2024/07/pmd-emerger-small.jpg'},
      {name:'Hares Ear Nymph',style:'Nymph',sizes:'12–18',hook:'Standard nymph',confidence:'High',weight:'Beadhead',tip:'Gold bead in riffles; unweighted in slow pools. Possibly the most versatile nymph in fly fishing — imitates mayflies, stoneflies, and caddis larvae.',photo:'https://norrik.com/wp-content/uploads/2024/07/hares-ear-nymph-small.jpg'},
      {name:'Cripple PMD',style:'Emerger',sizes:'16–18',hook:'Dry fly',confidence:'High',weight:'None',tip:'Hang tail in film. Trout love stuck emergers during heavy PMD hatches.',photo:'https://norrik.com/wp-content/uploads/2024/07/cripple-fly-small.jpg'},
      {name:'PMD Spinner',style:'Spinner',sizes:'14–18',hook:'Dry fly',confidence:'High',weight:'None',tip:'Spent PMD spinners fall at dusk after egg-laying. Pale yellow body with clear spent wings. Fish completely flat in the film with 6X tippet — trout sipping spinners are the most selective fish you will ever encounter.',photo:'https://norrik.com/wp-content/uploads/2024/07/classic-mayfly-emerger-small.jpg'},
      {name:'Prince Nymph',style:'Nymph',sizes:'12–18',hook:'Standard nymph',confidence:'High',weight:'Beadhead',tip:"One of fly fishing's most proven attractor nymphs. White biots suggest a hatching wing. Deadly searching pattern in freestone rivers year-round.",photo:'https://norrik.com/wp-content/uploads/2024/07/prince-nymph-small.jpg'}
    ]
  },
  {
    id:17, order:'mayfly', emoji:'🪲',
    name:'Sulphur', latin:'Ephemerella dorothea / invaria',
    seasons:['spring','summer'], peakMonths:'May–Jul',
    hatchTime:'Evening (6–9pm)', waterTemp:'55–65°F',
    waterType:'Eastern freestones, spring creeks, limestone streams',
    description:'The Sulphur is the eastern angler\'s PMD — same size, same silhouette, different color. Sulphurs are a vivid yellow-orange, hatching in vast evening clouds on rivers like the Delaware, Brodhead, and White. Matching the exact shade — from lemon yellow to burnt orange — often determines whether you catch fish or get skunked. One of the most important hatches in the eastern US.',
    stages:[
      {name:'Nymph',fly:'Sulphur Nymph / Split-Case PMD',sizes:'16–18',colors:['Olive-brown','Reddish brown'],waterLevel:'🪨 Bottom — dead drift in riffles and seams',desc:'Stocky nymph in riffles. Very similar to PMD nymph — same patterns work. Fish before the evening hatch begins.'},
      {name:'Emerger',fly:'Sulphur Cripple / Klinkhammer',sizes:'16–18',colors:['Yellow-orange','Tan'],waterLevel:'〰️ Surface film — struggling in the meniscus',desc:'Trout key on stuck emergers during heavy evening hatches. The most selective feeding of the year happens during sulphur cripple falls.'},
      {name:'Dun',fly:'Parachute Sulphur / Sulphur Comparadun',sizes:'16–18',colors:['Bright yellow','Yellow-orange','Pale gray wing'],waterLevel:'🏄 Top water — riding low on the surface',desc:'Classic evening dry fly. Color ranges from lemon yellow to golden orange depending on stream and species. Match the local color.'},
      {name:'Spinner',fly:'Sulphur Spinner',sizes:'16–18',colors:['Rusty orange','Clear wings'],waterLevel:'🏄 Top water — spent flush in film at dark',desc:'Spinner falls happen at dusk and after dark. Trout sip from barely visible rings. Essential late-season pattern.'}
    ],
    topFlies:[
      {name:'Sulphur Nymph',style:'Nymph',sizes:'14–18',hook:'Standard nymph',confidence:'High',weight:'Beadhead',tip:'Fish the bottom 30–60 min before the evening hatch starts. Sulphur nymphs are active crawlers — a gold bead Hares Ear or dedicated sulphur nymph in tan/amber is deadly in riffles.',photo:'https://norrik.com/wp-content/uploads/2024/07/pmd-dropper-nymph-small.jpg'},
      {name:'Parachute Sulphur',style:'Dry',sizes:'14–18',hook:'Dry fly',confidence:'High',weight:'None',tip:'Match the local color — lemon yellow on some rivers, orange-yellow on others. Evening hatch, often at last light. 5X tippet minimum.',photo:'https://norrik.com/wp-content/uploads/2024/07/pmd-parachute-small.jpg'},
      {name:'Sulphur Comparadun',style:'Dry',sizes:'16–18',hook:'Dry fly',confidence:'High',weight:'None',tip:'Low-riding deer hair wing. Perfect for selective fish on flat spring creek water. The toughest sulphur situations call for this over a parachute.',photo:'https://norrik.com/wp-content/uploads/2024/07/royal-wulff-small.jpg'},
      {name:'Sulphur Cripple',style:'Emerger',sizes:'16–18',hook:'Dry fly',confidence:'High',weight:'None',tip:'Hang the tail in the film. Trout lock onto cripples during heavy sulphur hatches — often outfishes the dun pattern 5-to-1.',photo:'https://norrik.com/wp-content/uploads/2024/07/cripple-fly-small.jpg'},
      {name:'Klinkhammer',style:'Emerger',sizes:'14–18',hook:'Klinkhammer/emerger',confidence:'High',weight:'None',tip:'Hook bend hangs below the film, parachute post above. Deadly when trout are taking emergers just below the surface. Works for sulphurs, PMDs, caddis — one of the most versatile emerger patterns ever tied.',photo:'https://norrik.com/wp-content/uploads/2024/07/soft-hackle-emerger-small.jpg'},
      {name:'Sulphur Spinner',style:'Spinner',sizes:'16–18',hook:'Dry fly',confidence:'High',weight:'None',tip:'Fish spent spinners at dusk with 6X tippet. Trout sipping nearly invisible rings after dark are almost always on spinners.',photo:'https://norrik.com/wp-content/uploads/2024/07/hendrickson-spinner-fly-small.jpg'},
      {name:'Hares Ear Nymph',style:'Nymph',sizes:'14–16',hook:'Standard nymph',confidence:'High',weight:'Beadhead',tip:'Fish before the evening hatch. Sulphur nymphs are active crawlers — a gold bead Hares Ear in riffles is hard to beat.',photo:'https://norrik.com/wp-content/uploads/2024/07/hares-ear-nymph-small.jpg'}
    ]
  },
  {
    id:3, order:'mayfly', emoji:'🪲',
    name:'Green Drake', latin:'Drunella grandis',
    seasons:['spring','summer'], peakMonths:'May–Jul',
    hatchTime:'Afternoon (2pm–dark)', waterTemp:'52–60°F',
    waterType:'Freestones, pocket water',
    description:"The Western Green Drake is one of the most anticipated hatches — large mayflies (hook sizes 10–14) that bring the biggest trout to the surface in broad daylight. Eastern Green Drakes (Ephemera guttulata) provide similar action on Appalachian streams.",
    stages:[
      {name:'Nymph',fly:'Olive Hares Ear',sizes:'10–14',colors:['Olive','Dark olive'],waterLevel:'🪨 Bottom — weighted deep in runs',desc:'Large, olive-green crawler. Fish weighted deep weeks before hatch.'},
      {name:'Emerger',fly:'Green Drake Cripple',sizes:'12–14',colors:['Bright olive','Yellow'],waterLevel:'〰️ Surface film — just below or in the meniscus',desc:'Large emergers struggle in surface film. Easy target for trout.'},
      {name:'Dun',fly:'Parachute Green Drake',sizes:'10–14',colors:['Bright olive body','Gray-green wing'],waterLevel:'🏄 Top water — large fly floating on surface',desc:'Large, highly visible. Hatches in afternoon, creates feeding frenzy.'},
      {name:'Spinner',fly:'Great Red Spinner',sizes:'12–14',colors:['Red-brown','Clear wings'],waterLevel:'🏄 Top water — spent at dusk',desc:'Spinner fall at dusk.'}
    ],
    topFlies:[
      {name:'Parachute Green Drake',style:'Dry',sizes:'10–14',hook:'Dry fly',confidence:'High',weight:'None',tip:'Big fly, big trout. Fish in foam lines during hatch.',photo:'https://norrik.com/wp-content/uploads/2024/07/green-drake-fly-small.jpg'},
      {name:'Olive Hares Ear',style:'Nymph',sizes:'10–14',hook:'Standard nymph',confidence:'High',weight:'Beadhead',tip:'Fish heavy weeks before hatch.',photo:'https://norrik.com/wp-content/uploads/2024/07/hares-ear-nymph-small.jpg'},
      {name:'Green Drake Cripple',style:'Emerger',sizes:'10–14',hook:'Dry fly',confidence:'High',weight:'None',tip:'Fish in the film during the hatch when trout are ignoring the adult. A crippled dun stuck in the shuck is the easiest meal on the water — trout key on these during heavy Green Drake emergences.',photo:'https://norrik.com/wp-content/uploads/2024/07/cripple-fly-small.jpg'},
      {name:'Great Red Spinner',style:'Spinner',sizes:'12–14',hook:'Dry fly',confidence:'Med',weight:'None',tip:'Dusk spinner fall often missed.',photo:'https://norrik.com/wp-content/uploads/2024/07/hendrickson-spinner-fly-small.jpg'}
    ]
  },
  {
    id:9, order:'mayfly', emoji:'🪲',
    name:'Trico', latin:'Tricorythodes spp.',
    seasons:['summer','fall'], peakMonths:'Jul–Oct',
    hatchTime:'Early morning (6–9am)', waterTemp:'60–72°F',
    waterType:'Spring creeks, tailwaters, slow pools',
    description:"Tricos are tiny (hook sizes 20–26) but produce massive spinner falls on late summer mornings. When thousands of spent spinners blanket the water, trout rise with mechanical regularity. One of the most technical and rewarding hatches in fly fishing.",
    stages:[
      {name:'Dun',fly:'Trico Dun',sizes:'22–26',colors:['Black','Olive','Cream'],waterLevel:'🏄 Top water — briefly on surface',desc:'Short-lived. Dun stage occurs in late summer evenings and early morning.'},
      {name:'Spinner',fly:'Trico Spinner / CDC Trico',sizes:'20–26',colors:['Black','White wings'],waterLevel:'🏄 Top water — spent flush in film',desc:'The key stage. Massive spinner falls carpet the surface. Trout sip endlessly.'}
    ],
    topFlies:[
      {name:'Trico Dun',style:'Dry',sizes:'20–24',hook:'Dry fly',confidence:'High',weight:'None',tip:'The dun emerges en masse early morning before the spinner fall. Fish a tiny CDC dun or RS2 in the film. Short window — trout switch to spinners fast once the fall begins.',photo:'https://norrik.com/wp-content/uploads/2024/07/rs2-dry-fly-small-1.jpg'},
      {name:'Trico Spinner',style:'Spinner/Dry',sizes:'20–26',hook:'Dry fly',confidence:'High',weight:'None',tip:'Fish during the spinner fall. Use 6X or 7X tippet. Let the fly drift without drag — trout are extremely selective.',photo:'https://norrik.com/wp-content/uploads/2024/07/classic-mayfly-emerger-small.jpg'},
      {name:'CDC Trico',style:'Dry/Spinner',sizes:'22–26',hook:'Dry fly',confidence:'High',weight:'None',tip:'CDC wing sits flush in the film perfectly. Use a cluster pattern when fish are picking off multiple spinners at once.',photo:'https://norrik.com/wp-content/uploads/2024/07/rs2-dry-fly-small-1.jpg'},
      {name:'Pheasant Tail Nymph',style:'Nymph',sizes:'20–24',hook:'Midge/Nymph',confidence:'Med',weight:'Unweighted',tip:'Fish tiny PT before the spinner fall begins.',photo:'https://norrik.com/wp-content/uploads/2024/07/pheasant-tail-nymph-small.jpg'}
    ]
  },
  {
    id:10, order:'mayfly', emoji:'🪲',
    name:'Hendrickson / March Brown', latin:'Ephemerella subvaria / Rhithrogena spp.',
    seasons:['spring'], peakMonths:'Apr–Jun',
    hatchTime:'Afternoon (1–4pm)', waterTemp:'48–58°F',
    waterType:'Freestones, Eastern & Midwest streams',
    description:"The Hendrickson is one of the first major mayfly hatches of spring, bringing trout to the surface after a long winter. March Browns overlap in timing and are equally important on northeastern and mid-Atlantic freestone rivers. Both are must-know hatches for eastern anglers.",
    stages:[
      {name:'Nymph',fly:'Hendrickson Nymph / Hares Ear',sizes:'12–16',colors:['Brown','Tan','Gray'],waterLevel:'🪨 Bottom — dead drift in riffles',desc:'Stocky crawler nymph. Most active as water warms in spring.'},
      {name:'Emerger',fly:'Klinkhammer / CDC Emerger',sizes:'14–16',colors:['Reddish-brown','Pink','Tan'],waterLevel:'〰️ Surface film — hanging in the meniscus',desc:'Trout lock onto struggling emergers. Fish a soft-hackle just below the film.'},
      {name:'Dun',fly:'Parachute Hendrickson / Red Quill',sizes:'12–16',colors:['Pink-brown','Gray wing'],waterLevel:'🏄 Top water — floating on surface',desc:'Large, pinkish-brown dun. Afternoon hatch in spring.'},
      {name:'Spinner',fly:'Rusty Spinner',sizes:'14–16',colors:['Rusty brown','Clear wings'],waterLevel:'🏄 Top water — spent at dusk',desc:'Spinner fall in evenings.'}
    ],
    topFlies:[
      {name:'CDC Emerger',style:'Emerger',sizes:'12–16',hook:'Dry fly',confidence:'High',weight:'None',tip:'CDC feather in the film imitates a dun struggling to emerge. Fish during the Hendrickson hatch when trout are refusing dry flies. The soft CDC wing creates a lifelike footprint that fooling even the wariest fish.',photo:'https://norrik.com/wp-content/uploads/2024/07/hendrickson-emerger-small.jpg'},
      {name:'Parachute Hendrickson',style:'Dry',sizes:'12–16',hook:'Dry fly',confidence:'High',weight:'None',tip:'Classic eastern dry fly. Fish during the afternoon hatch in April–May.',photo:'https://norrik.com/wp-content/uploads/2024/07/hendrickson-dry-fly-small.jpg'},
      {name:'Red Quill',style:'Dry',sizes:'12–16',hook:'Dry fly',confidence:'High',weight:'None',tip:'Traditional wet fly also works well swung downstream.',photo:'https://norrik.com/wp-content/uploads/2024/07/red-quill-fly-small.jpg'},
      {name:'Soft Hackle Pheasant Tail',style:'Wet/Emerger',sizes:'12–16',hook:'Standard nymph',confidence:'High',weight:'Unweighted',tip:'Swing across and down during emergence. Deadly during March Brown hatches.',photo:'https://norrik.com/wp-content/uploads/2024/07/hares-ear-soft-hackle-small.jpg'},
      {name:'Hendrickson Nymph',style:'Nymph',sizes:'12–16',hook:'Standard nymph',confidence:'High',weight:'Beadhead',tip:'The Hendrickson nymph is an active swimmer. Fish in the days leading up to the hatch with a jigging retrieve in slow pools and runs.',photo:'https://norrik.com/wp-content/uploads/2024/07/hendrickson-nymph-small.jpg'},
      {name:'Rusty Spinner',style:'Spinner',sizes:'12–16',hook:'Dry fly',confidence:'High',weight:'None',tip:'The Hendrickson spinner fall happens at dusk — often the best fishing of the day. Spent wings flat in the film. Fish with 5X or 6X and a dead drift.',photo:'https://norrik.com/wp-content/uploads/2024/07/rusty-spinner-small.jpg'},
      {name:'Hares Ear Nymph',style:'Nymph',sizes:'12–16',hook:'Standard nymph',confidence:'High',weight:'Beadhead',tip:'Fish this before the hatch begins. Deadliest early spring nymph.',photo:'https://norrik.com/wp-content/uploads/2024/07/hares-ear-nymph-small.jpg'}
    ]
  },
  // ─── CADDISFLIES ─────────────────────────────────────────────────────────
  {
    id:4, order:'caddis', emoji:'🦋',
    name:'Caddisfly (Spring & Summer)', latin:'Brachycentrus / Hydropsyche spp.',
    seasons:['spring','summer'], peakMonths:'Apr–Sep',
    hatchTime:'Evening (5pm–dark)', waterTemp:'50–70°F',
    waterType:'Freestones, medium to fast water',
    description:'Caddisflies are the most abundant aquatic insects in most trout streams worldwide. Color is the key to matching them: spring "Mother\'s Day" caddis (Brachycentrus) are bright green-bodied; summer Hydropsyche are tan/amber; fall brings the enormous orange October Caddis. Unlike mayflies, adults skitter and flutter — trout slash aggressively.',
    stages:[
      {name:'Larva',fly:'Frenchie / Green Caddis Larva',sizes:'12–16',colors:['Bright green (spring)','Tan/brown (summer)'],waterLevel:'🪨 Bottom — tumbling along riverbed',desc:'Color varies by species and season. Spring Mother\'s Day larvae are bright green. Summer and fall caddis run tan to brown. Match the season.'},
      {name:'Pupa',fly:'LaFontaine Sparkle Pupa (Green)',sizes:'12–16',colors:['Green (spring)','Amber/brown (summer)','Orange (fall)'],waterLevel:'💧 Mid-column to film — rising fast to surface',desc:'Most critical stage. Match color to season: green in spring, amber in summer, orange in fall. Pupa rises rapidly — trout hit it hard just below the film.'},
      {name:'Adult',fly:'Elk Hair Caddis / X-Caddis',sizes:'12–18',colors:['Olive/tan (spring)','Tan/brown (summer)'],waterLevel:'🏄 Top water — skating and skittering on surface',desc:'Tent-shaped wing on surface. Skitter to imitate egg-laying. Color variations: olive-green in spring, tan in summer, orange-brown in fall.'}
    ],
    topFlies:[
      {name:'Elk Hair Caddis (Tan)',style:'Dry',sizes:'12–18',hook:'Dry fly',confidence:'High',weight:'None',tip:'Tan is the universal summer color. Skitter across surface to imitate egg-laying females. One of the 5 most important dry flies ever tied.',photo:'https://norrik.com/wp-content/uploads/2024/07/elk-hair-caddis-small-1.jpg'},
      {name:'Elk Hair Caddis (Olive)',style:'Dry',sizes:'12–18',hook:'Dry fly',confidence:'High',weight:'None',tip:"Olive body for the spring Mother's Day caddis hatch (Brachycentrus). One of the most important spring hatches in the West and East.",photo:'https://norrik.com/wp-content/uploads/2024/07/caddis-emerger-small.jpg'},
      {name:'LaFontaine Sparkle Pupa (Green)',style:'Pupa/Wet',sizes:'12–16',hook:'Standard nymph',confidence:'High',weight:'None',tip:'Bright green body for spring caddis. Fish just below the surface on a swing. The most important spring caddis pupa pattern.',photo:'https://norrik.com/wp-content/uploads/2024/07/caddis-pupa-nymph-small.jpg'},
      {name:'LaFontaine Sparkle Pupa (Amber)',style:'Pupa/Wet',sizes:'12–16',hook:'Standard nymph',confidence:'High',weight:'None',tip:'Amber/tan for summer caddis pupa. Dead drift or swing under the surface during evening caddis flights.',photo:'https://norrik.com/wp-content/uploads/2024/07/adams-fly-small.jpg'},
      {name:'X-Caddis',style:'Dry/Emerger',sizes:'14–18',hook:'Dry fly',confidence:'High',weight:'None',tip:'Z-lon shuck hangs in the film. Deadly for selective fish during heavy caddis hatches. Carry in tan and olive.',photo:'https://norrik.com/wp-content/uploads/2024/07/elk-hair-emerger-small.jpg'},
      {name:'Frenchie',style:'Nymph',sizes:'12–18',hook:'Jig nymph',confidence:'High',weight:'Tungsten bead',tip:'Euro nymphing staple. Hot spot pink/orange collar triggers strikes. Year-round caddis larva imitation.',photo:'https://norrik.com/wp-content/uploads/2024/07/perdigon-nymph-small.jpg'},
      {name:'Green Caddis Larva',style:'Larva',sizes:'12–16',hook:'Standard nymph',confidence:'High',weight:'Tungsten bead',tip:'Bright chartreuse/green body imitates the Mother\'s Day caddis larva perfectly. Dead drift deep along the bottom in spring. One of the most overlooked productive patterns of the season.',photo:'https://norrik.com/wp-content/uploads/2024/07/caddis-pupa-nymph-small.jpg'},
      {name:'Goddard Caddis',style:'Dry',sizes:'10–14',hook:'Dry fly',confidence:'High',weight:'None',tip:'Spun deer hair rides high and skates beautifully in fast water. Excellent searching pattern when you can\'t see the fly.',photo:'https://norrik.com/wp-content/uploads/2024/07/goddard-caddis-fly-small.jpg'}
    ]
  },
  {
    id:16, order:'caddis', emoji:'🦋',
    name:'October Caddis', latin:'Dicosmoecus spp.',
    seasons:['fall'], peakMonths:'Sep–Nov',
    hatchTime:'Afternoon to evening (2pm–dark)', waterTemp:'45–58°F',
    waterType:'Western freestones — Deschutes, Klamath, Sacramento, Madison',
    description:'The October Caddis (Giant Orange Sedge) is the last major hatch of the western season — and one of the most exciting. At up to 1.25 inches long, these burnt-orange insects are too big for trout to ignore. Gary LaFontaine called them one of only three hatches capable of reliably bringing the largest trout to the surface. Eastern anglers have their own version: the Great Autumn Brown Sedge (Pycnopsyche), same behavior, more brown-toned.',
    stages:[
      {name:'Larva',fly:'Cased Caddis / Deep Caddis Larva',sizes:'6–10',colors:['Burnt orange','Dark brown'],waterLevel:'🪨 Bottom — case dragging along the riverbed',desc:'October caddis are case-builders. They drag their rock/stick cases along cobble. Fish begin eating them as larvae drift during warmest daylight hours all summer.'},
      {name:'Pupa',fly:'October Caddis Pupa',sizes:'6–10',colors:['Burnt orange body','Black head','Ginger hackle'],waterLevel:'💧 Mid-column — swung or dead drifted',desc:'Pupae emerge mid-stream or on rocks. Burnt orange body, black bead head. Swing across and down or dead drift. This is the most productive subsurface stage.'},
      {name:'Adult',fly:'Orange EHC / Orange Stimulator',sizes:'8–12',colors:['Burnt orange','Dark grayish-brown wing'],waterLevel:'🏄 Top water — skated and twitched',desc:'Large adults skitter, flutter, and dive-bomb to lay eggs. Animate the fly — twitch, skate, swing. Skating triggers explosive strikes. Evening is peak time.'}
    ],
    topFlies:[
      {name:'Cased Caddis',style:'Nymph/Larva',sizes:'6–10',hook:'Heavy nymph',confidence:'High',weight:'Tungsten bead',tip:'Dead drift deep along the bottom. October Caddis are case-builders — they drag rock and stick cases along the riverbed all summer and fall. Fish before the hatch with a heavy anchor fly.',photo:'https://norrik.com/wp-content/uploads/2024/07/girdle-bug-fly-small.jpg'},
      {name:'Orange Elk Hair Caddis',style:'Dry',sizes:'8–12',hook:'Dry fly',confidence:'High',weight:'None',tip:'Burnt orange foam body, ginger hackle, dark deer hair wing. Skate and twitch at dusk — October Caddis egg-laying is active, not passive.',photo:'https://norrik.com/wp-content/uploads/2024/07/october-caddis-fly-small.jpg'},
      {name:'Orange Stimulator',style:'Dry/Attractor',sizes:'8–12',hook:'Dry fly',confidence:'High',weight:'None',tip:'Big, buoyant, and orange — imitates both October Caddis and Salmonfly adults. Excellent searching pattern even without a visible hatch.',photo:'https://norrik.com/wp-content/uploads/2024/07/golden-stonefly-nymph-small.jpg'},
      {name:'October Caddis Pupa',style:'Pupa/Wet',sizes:'6–10',hook:'Standard nymph',confidence:'High',weight:'Black tungsten bead',tip:'Burnt orange body, black bead. Swing across and down through riffles and runs. Add rod twitches to suggest an ascending pupa. Also works for steelhead.',photo:'https://norrik.com/wp-content/uploads/2024/07/caddis-pupa-nymph-small.jpg'},
      {name:'Goddard Caddis (Orange)',style:'Dry',sizes:'8–12',hook:'Dry fly',confidence:'High',weight:'None',tip:'Spun deer hair head creates water disturbance when skated. The wake triggers reaction strikes from large fish.',photo:'https://norrik.com/wp-content/uploads/2024/07/goddard-caddis-fly-small.jpg'}
    ]
  },
  // ─── STONEFLIES ──────────────────────────────────────────────────────────
  {
    id:5, order:'stonefly', emoji:'🦗',
    name:'Salmonfly', latin:'Pteronarcys californica',
    seasons:['spring'], peakMonths:'May–Jul',
    hatchTime:'Afternoon, moving upstream', waterTemp:'50–60°F',
    waterType:'Large freestone rivers, cobble runs',
    description:'The Salmonfly hatch is the Super Bowl of western fly fishing. These enormous stoneflies (2–3 inches long) emerge from big western rivers in a wave that moves upstream with warming temperatures. The Madison, Yellowstone, and Deschutes are famous for this hatch.',
    stages:[
      {name:'Nymph',fly:'Kaufmanns Stone / 20 Incher',sizes:'2–6',colors:['Dark brown','Black'],waterLevel:'🪨 Bottom — crawling along cobble riverbed',desc:'Lives in rivers 2–4 years. Crawls to bankside rocks to emerge. Fish before the hatch.'},
      {name:'Adult',fly:'Chubby Chernobyl / Sofa Pillow',sizes:'2–8',colors:['Orange','Red-orange','Brown wing'],waterLevel:'🏄 Top water — large fly near banks',desc:'Enormous surface fly. Fish near banks and under overhanging vegetation.'}
    ],
    topFlies:[
      {name:'Chubby Chernobyl',style:'Dry',sizes:'4–8',hook:'Dry fly',confidence:'High',weight:'None',tip:'Foam body floats all day. Doubles as a hopper indicator for a dropper rig.',photo:'https://norrik.com/wp-content/uploads/2024/07/chubby-chernobyl-small.jpg'},
      {name:'Sofa Pillow',style:'Dry',sizes:'2–6',hook:'Dry fly',confidence:'High',weight:'None',tip:'Classic big-water salmonfly dry. Slap it down near banks.',photo:'https://norrik.com/wp-content/uploads/2024/07/salmon-dry-fly-pattern-small.jpg'},
      {name:'Kaufmanns Stone',style:'Nymph',sizes:'2–6',hook:'Heavy nymph',confidence:'High',weight:'Lead wire',tip:'Fish deep along the bottom before the hatch peaks. The most realistic salmonfly nymph.',photo:'https://norrik.com/wp-content/uploads/2024/07/black-stonefly-nymph-small.jpg'},
      {name:'PMX (Purple Haze)',style:'Dry/Attractor',sizes:'4–10',hook:'Dry fly',confidence:'High',weight:'None',tip:"Parachute Madam X — one of the most effective big dry flies ever tied. The purple version is a Yellowstone/Madison staple. Fish it as a single or with a nymph dropper. Trout crush it even between hatches.",photo:'https://norrik.com/wp-content/uploads/2024/07/chubby-chernobyl-small.jpg'}
    ]
  },
  {
    id:6, order:'stonefly', emoji:'🦗',
    name:'Golden Stonefly', latin:'Hesperoperla pacifica',
    seasons:['spring','summer'], peakMonths:'Jun–Aug',
    hatchTime:'Morning and evening', waterTemp:'55–68°F',
    waterType:'Freestones, pocket water, medium rivers',
    description:"Golden stoneflies follow the salmonfly hatch and keep large attractor dry fly fishing productive through summer. Smaller yellow sallies (Isoperla spp.) overlap in timing and are found coast to coast — don't overlook them on eastern streams.",
    stages:[
      {name:'Nymph',fly:"Pat's Rubber Legs",sizes:'6–10',colors:['Gold','Yellow-brown'],waterLevel:'🪨 Bottom — deep in pocket water',desc:'Multi-year resident. Best fished before emergence.'},
      {name:'Adult',fly:'Yellow Stimulator',sizes:'6–14',colors:['Golden yellow','Tan wing'],waterLevel:'🏄 Top water — skating on surface near banks',desc:'Skates and flutters. Fish banks and pocket water with an occasional twitch.'}
    ],
    topFlies:[
      {name:'Yellow Stimulator',style:'Dry',sizes:'6–14',hook:'Dry fly',confidence:'High',weight:'None',tip:'Year-round attractor. Dead drift or skitter. Great hopper-dropper indicator.',photo:'https://norrik.com/wp-content/uploads/2024/07/golden-stonefly-nymph-small.jpg'},
      {name:"Pat's Rubber Legs",style:'Nymph',sizes:'6–10',hook:'Heavy nymph',confidence:'High',weight:'Tungsten bead',tip:'Get it deep in pocket water. Rubber legs pulse with the current — irresistible.',photo:'https://norrik.com/wp-content/uploads/2024/07/pats-rubber-legs.jpg'},
      {name:'Royal Wulff',style:'Dry',sizes:'10–16',hook:'Dry fly',confidence:'High',weight:'None',tip:"One of fly fishing's most famous attractors. Visible in fast water. Works when nothing is hatching.",photo:'https://norrik.com/wp-content/uploads/2024/07/royal-wulff-small.jpg'}
    ]
  },
  // ─── MIDGES ──────────────────────────────────────────────────────────────
  {
    id:7, order:'midge', emoji:'🦟',
    name:'Midge (Chironomid)', latin:'Chironomidae family',
    seasons:['spring','summer','fall','winter'], peakMonths:'Year-round',
    hatchTime:'Variable, often midday in winter', waterTemp:'33–75°F',
    waterType:'Tailwaters, still water, spring creeks',
    description:"Midges are the bread and butter of tailwater fly fishing worldwide. Present 365 days a year, these tiny flies (size 18–28) make up the majority of a trout's diet in many rivers. In still water (especially in Canada and the West), chironomid fishing under an indicator is its own art form.",
    stages:[
      {name:'Larva',fly:'Brassie / Blood Midge',sizes:'18–26',colors:['Red','Olive','Black'],waterLevel:'🪨 Bottom — slow currents near bed',desc:'Slim, segmented larva. Year-round in slow currents and still water.'},
      {name:'Pupa',fly:'Zebra Midge / Mercury Midge',sizes:'18–26',colors:['Black','Red','Olive'],waterLevel:'〰️ Surface film — suspended just below',desc:'Hangs just below film. Most critical stage for selective trout.'},
      {name:'Adult',fly:"Griffith's Gnat",sizes:'18–28',colors:['Black','Gray'],waterLevel:'🏄 Top water — tiny flies on surface',desc:"Tiny flies on surface, often in clusters. Difficult to see — use high-vis post."},
      {name:'Buffalo Midge (Emerger)',fly:'Mother Shucker (Black)',sizes:'16–20',colors:['Black','Gray','Brown'],waterLevel:'〰️ Surface film — stuck in shuck during emergence',desc:'Large midge with a distinctive hump on its back. Hatches midday (12:30–1:30pm) on the Provo River, March–April. Fish are keyed in on the trailing shuck. One of the best dry fly hatches in Utah.'}
    ],
    topFlies:[
      {name:'Zebra Midge',style:'Pupa/Nymph',sizes:'18–24',hook:'Midge',confidence:'High',weight:'Beadhead',tip:'Fish 18 inches below indicator in tailwaters. The single most important tailwater fly.',photo:'https://norrik.com/wp-content/uploads/2024/07/gray-midge-emerger-small.jpg'},
      {name:'Mercury Midge',style:'Pupa',sizes:'18–24',hook:'Midge',confidence:'High',weight:'Clear bead',tip:'Glass bead catches light. Exceptional on the South Platte and Bighorn.',photo:'https://norrik.com/wp-content/uploads/2024/07/parachute-midge-small.jpg'},
      {name:"Griffith's Gnat",style:'Dry',sizes:'18–24',hook:'Dry fly',confidence:'High',weight:'None',tip:'Mimics a midge cluster on the surface. Essential tailwater dry fly.',photo:'https://norrik.com/wp-content/uploads/2024/07/griffiths-gnat-small.jpg'},
      {name:'Brassie',style:'Larva',sizes:'18–24',hook:'Midge',confidence:'High',weight:'Wire body',tip:'Copper wire body is heavy and segmented. Pair with a Zebra Midge dropper.',photo:'https://norrik.com/wp-content/uploads/2024/07/scud-nymph-fly-small.jpg'},
      {name:'Blood Midge',style:'Larva',sizes:'20–26',hook:'Midge',confidence:'High',weight:'Unweighted',tip:'Bright red thread body imitates blood midge larvae (Chironomus). Essential in stillwater and slow tailwaters. Fish on a long dropper below a tiny indicator near the bottom.',photo:'https://norrik.com/wp-content/uploads/2024/07/san-juan-worm.jpg'},
      {name:'WD-40',style:'Emerger/Pupa',sizes:'20–26',hook:'Midge',confidence:'High',weight:'Unweighted',tip:"Deadly during BWO and midge emergences. Fish in the film when trout are sipping and you can't figure out what they're eating.",photo:'https://norrik.com/wp-content/uploads/2024/07/soft-hackle-emerger-small.jpg'},
      {name:'Rainbow Warrior',style:'Pupa/Attractor',sizes:'18–22',hook:'Midge/Jig nymph',confidence:'High',weight:'Tungsten bead',tip:"Lance Egan's flashy midge pupa — the pearl body and pink legs make it irresistible to tailwater trout. Fish it as the top fly in a two-fly nymph rig. Effective year-round but especially winter and early spring.",photo:'https://norrik.com/wp-content/uploads/2024/07/rainbow-warrior-fly-small.jpg'},
      {name:'Top Secret Midge',style:'Pupa/Emerger',sizes:'20–26',hook:'Midge',confidence:'High',weight:'Beadhead or unweighted',tip:"Pat Dorsey's South Platte special. Thread body with a touch of sparkle — fish it last in a three-fly rig behind a Copper John and Mercury Midge. Unweighted version excels in the film.",photo:'https://norrik.com/wp-content/uploads/2024/07/serendipity-fly-small.jpg'},
      {name:'Black Beauty',style:'Larva/Pupa',sizes:'20–26',hook:'Midge',confidence:'High',weight:'Unweighted',tip:'Slim black thread body with a thin wire rib — nearly invisible but incredibly effective on pressured tailwaters. A go-to when trout are refusing everything else. Best in clear, low water conditions.',photo:'https://norrik.com/wp-content/uploads/2024/07/soft-hackle-nymph-small.jpg'},
      {name:'Mother Shucker (Black)',style:'Emerger/Dry',sizes:'16–20',hook:'Dry fly',confidence:'High',weight:'None',tip:'The go-to fly for the Buffalo Midge hatch on the Provo River. Fish dead drift in the film — trout key on the trailing shuck. Black is the most common color. Use 6–7x tippet.',photo:'https://norrik.com/wp-content/uploads/2024/07/gray-midge-emerger-small.jpg'},
      {name:'Mother Shucker (Gray)',style:'Emerger/Dry',sizes:'16–20',hook:'Dry fly',confidence:'High',weight:'None',tip:'Gray version of the Mother Shucker — often the best color on overcast days or in clear water. Fish single in the film or as the lead fly with a small BWO dropper behind it.',photo:'https://norrik.com/wp-content/uploads/2024/07/parachute-midge-small.jpg'},
      {name:'Mother Shucker (Brown)',style:'Emerger/Dry',sizes:'16–20',hook:'Dry fly',confidence:'High',weight:'None',tip:'Brown version shines in warmer spring conditions and later in the hatch season (March–April). Fish dead drift with a drag-free presentation. A Provo River staple.',photo:'https://norrik.com/wp-content/uploads/2024/07/gray-midge-emerger-small.jpg'}
    ]
  },
  // ─── TERRESTRIALS ────────────────────────────────────────────────────────
  {
    id:8, order:'terrestrial', emoji:'🐜',
    name:'Grasshopper', latin:'Acrididae family',
    seasons:['summer','fall'], peakMonths:'Jul–Sep',
    hatchTime:'Midday (10am–4pm, wind helps)', waterTemp:'65–78°F',
    waterType:'Meadow streams, river banks near grass',
    description:'Hopper fishing is perhaps the most exciting dry fly angling. Big foam hoppers slapped hard along grassy banks draw violent strikes from large trout. The hopper-dropper rig — a heavy nymph hung below a foam hopper — is one of the most productive summer setups.',
    stages:[
      {name:'Adult',fly:"Dave's Hopper / Chubby Chernobyl",sizes:'4–12',colors:['Yellow','Tan','Green'],waterLevel:'🏄 Top water — slapped hard on surface near banks',desc:'Fish tight to banks. Slap the fly down to imitate the impact. Occasional twitches trigger strikes.'}
    ],
    topFlies:[
      {name:"Dave's Hopper",style:'Dry',sizes:'6–12',hook:'Dry fly',confidence:'High',weight:'None',tip:'Slap hard against the bank. Pause 3–5 seconds then twitch.',photo:'https://norrik.com/wp-content/uploads/2024/07/hopper-fly-small.jpg'},
      {name:'Chubby Chernobyl',style:'Dry/Attractor',sizes:'6–10',hook:'Dry fly',confidence:'High',weight:'None',tip:'Best indicator for a dropper rig. Float all day without reapplying floatant.',photo:'https://norrik.com/wp-content/uploads/2024/07/chubby-chernobyl-small.jpg'},
      {name:'Parachute Hopper',style:'Dry',sizes:'8–12',hook:'Dry fly',confidence:'High',weight:'None',tip:'High-vis parachute post. Excellent on flat-water meadow stretches.',photo:'https://norrik.com/wp-content/uploads/2024/07/hopper-fly-small.jpg'},
      {name:'Fat Albert',style:'Dry/Attractor',sizes:'6–10',hook:'Dry fly',confidence:'High',weight:'None',tip:'Foam body with rubber legs. Imitates hoppers, crickets, and large stoneflies. Great hopper-dropper indicator.',photo:'https://norrik.com/wp-content/uploads/2024/07/chubby-chernobyl-small.jpg'}
    ]
  },
  {
    id:11, order:'terrestrial', emoji:'🐜',
    name:'Ant & Beetle', latin:'Formicidae / Coleoptera',
    seasons:['summer','fall'], peakMonths:'Jun–Sep',
    hatchTime:'All day (wind events, ant flights)', waterTemp:'60–78°F',
    waterType:'Any stream with bankside vegetation',
    description:"Ants and beetles are year-round food sources but become critical in summer when they fall or are blown into streams. Ant flights (when thousands of winged ants swarm) can trigger feeding frenzies that rival major hatches. Beetles are the most numerous insects on Earth — trout see them constantly.",
    stages:[
      {name:'Ant',fly:'Foam Ant / Flying Ant',sizes:'12–20',colors:['Black','Cinnamon','Red'],waterLevel:'🏄 Top water — flush in surface film',desc:'Fish near banks, under overhanging trees. During ant flights, fish midstream. Use a CDC winged ant for winged falls.'},
      {name:'Beetle',fly:'Foam Beetle / Deer Hair Beetle',sizes:'12–18',colors:['Black','Brown'],waterLevel:'🏄 Top water — low-riding on surface',desc:'Work along banks and log jams. Beetles ride very low — match the slim profile.'}
    ],
    topFlies:[
      {name:'Foam Ant',style:'Dry',sizes:'14–20',hook:'Dry fly',confidence:'High',weight:'None',tip:'Simple but deadly. Works on pressured fish that reject hoppers. High-vis foam post helps sighting.',photo:'https://norrik.com/wp-content/uploads/2024/07/chernobyl-ant-small.jpg'},
      {name:'Flying Ant',style:'Dry',sizes:'14–18',hook:'Dry fly',confidence:'High',weight:'None',tip:'During ant flights, this fly outfishes everything. Keep a few winged ant patterns in your box at all times.',photo:'https://norrik.com/wp-content/uploads/2024/07/chernobyl-ant-small.jpg'},
      {name:'Foam Beetle',style:'Dry',sizes:'12–18',hook:'Dry fly',confidence:'High',weight:'None',tip:'Drift along banks and foam lines. Foam body is virtually unsinkable. Works throughout the season.',photo:'https://norrik.com/wp-content/uploads/2024/07/beetle-fly-small.jpg'},
      {name:'Deer Hair Beetle',style:'Dry',sizes:'12–18',hook:'Dry fly',confidence:'High',weight:'None',tip:'Spun deer hair creates a realistic low-riding profile. More subtle than foam — better for spring creeks and educated fish. Fish tight to grassy banks.',photo:'https://norrik.com/wp-content/uploads/2024/07/chernobyl-ant-small.jpg'},
      {name:'CDC Ant',style:'Dry',sizes:'16–20',hook:'Dry fly',confidence:'High',weight:'None',tip:'For selective fish in still water and spring creeks. CDC wing provides a realistic footprint in the film.',photo:'https://norrik.com/wp-content/uploads/2024/07/ant-fly-pattern-small.jpg'}
    ]
  },
  // ─── STREAMERS ───────────────────────────────────────────────────────────
  {
    id:12, order:'streamer', emoji:'🐟',
    name:'Woolly Bugger', latin:'Streamer / Attractor',
    seasons:['spring','summer','fall','winter'], peakMonths:'Year-round',
    hatchTime:'Any time, especially low light', waterTemp:'Any',
    waterType:'All water types — rivers, lakes, tailwaters',
    description:"The Woolly Bugger is arguably the most versatile and widely used fly ever tied. It imitates leeches, crayfish, baitfish, large nymphs, and virtually anything alive in the water. It catches trout, bass, pike, panfish, and saltwater species. Every fly box in the world should have at least three.",
    stages:[
      {name:'Streamer',fly:'Woolly Bugger (Black)',sizes:'4–12',colors:['Olive','Black','Brown','White'],waterLevel:'💧 Mid-column — strip, swing, or dead drift',desc:'Marabou tail pulses with lifelike action. Fish with a strip-pause retrieve or dead drift under an indicator.'}
    ],
    topFlies:[
      {name:'Woolly Bugger (Olive)',style:'Streamer',sizes:'4–10',hook:'Streamer',confidence:'High',weight:'Tungsten bead/conehead',tip:"Strip-pause retrieve along banks and deep pools. Olive is the single most productive color. The world's most versatile fly.",photo:'https://norrik.com/wp-content/uploads/2024/07/cheech-leech-streamer-small.jpg'},
      {name:'Woolly Bugger (Black)',style:'Streamer',sizes:'4–10',hook:'Streamer',confidence:'High',weight:'Tungsten bead/conehead',tip:'Black is the go-to in low light, stained water, and overcast days. Also deadly for bass and pike.',photo:'https://norrik.com/wp-content/uploads/2024/07/woolly-bugger.jpg'},
      {name:'Woolly Bugger (Brown)',style:'Streamer',sizes:'4–10',hook:'Streamer',confidence:'High',weight:'Tungsten bead/conehead',tip:'Brown matches sculpin and crayfish — the most natural-looking color in clear water. Often outfishes olive and black in bright conditions and low, clear rivers.',photo:'https://norrik.com/wp-content/uploads/2024/07/near-nuff-sculpin-small.jpg'},
      {name:'Muddler Minnow',style:'Streamer',sizes:'4–10',hook:'Streamer',confidence:'High',weight:'Optional cone',tip:'Imitates sculpin and baitfish. Fish dead drift, strip, or swing. One of the most historically proven streamers ever tied.',photo:'https://norrik.com/wp-content/uploads/2024/07/muddler-minnow-fly-small.jpg'},
      {name:'Clouser Minnow',style:'Streamer',sizes:'4–8',hook:'Streamer',confidence:'High',weight:'Dumbbell eyes',tip:'Weighted eyes cause a jig action. Deadly for trout, bass, and saltwater fish. Fish with fast strips.',photo:'https://norrik.com/wp-content/uploads/2024/07/clouser-minnow-small.jpg'}
    ]
  },
  {
    id:13, order:'streamer', emoji:'🐟',
    name:'Sculpin & Leech', latin:'Cottus spp. / Hirudinea',
    seasons:['spring','summer','fall','winter'], peakMonths:'Year-round, best fall–winter',
    hatchTime:'Dawn, dusk, overcast — big browns are active',waterTemp:'Any',
    waterType:'Rocky freestones, tailwaters, lakes',
    description:'Sculpins are small, bottom-hugging baitfish found in virtually every trout stream. They are the primary food source for large brown trout. Leeches are abundant in slow pools and lakes. Both trigger aggressive predatory strikes from the biggest fish in the river.',
    stages:[
      {name:'Sculpin',fly:'Sculpin Helmet / Conehead Muddler',sizes:'2–8',colors:['Brown','Olive','Black'],waterLevel:'🪨 Bottom — crawl along the riverbed',desc:'Sculpin crawl along the bottom. Dead drift along cobble, then strip and pause near boulders.'},
      {name:'Leech',fly:'Woolly Bugger / Zonker',sizes:'4–10',colors:['Black','Brown','Maroon'],waterLevel:'💧 Mid-column — slow strip retrieve',desc:'Leeches undulate with a slow, sinuous movement. Strip slowly with long pauses.'}
    ],
    topFlies:[
      {name:'Zonker',style:'Streamer',sizes:'4–8',hook:'Streamer',confidence:'High',weight:'Conehead',tip:'Rabbit strip wing breathes with every strip. Deadly for big browns in fall. Fish on the swing in deep runs.',photo:'https://norrik.com/wp-content/uploads/2024/07/articulated-streamer-small.jpg'},
      {name:'Conehead Muddler',style:'Streamer/Sculpin',sizes:'4–8',hook:'Streamer',confidence:'High',weight:'Brass cone',tip:'Bounce along the bottom in deep runs. Best for large, aggressive fish holding near structure.',photo:'https://norrik.com/wp-content/uploads/2024/07/muddler-minnow-fly-small.jpg'},
      {name:'Sculpin Helmet',style:'Streamer/Sculpin',sizes:'2–6',hook:'Streamer',confidence:'High',weight:'Lead eyes',tip:'The foam sculpin head pushes water and dives on the strip. One of the most realistic sculpin imitations available. Fish on a short tippet and bounce it along the bottom with strip-pause-strip.',photo:'https://norrik.com/wp-content/uploads/2024/07/sculpin-streamer-small.jpg'},
      {name:'Egg-Sucking Leech',style:'Streamer',sizes:'4–8',hook:'Streamer',confidence:'High',weight:'Tungsten bead',tip:'Hot pink or orange bead imitates an egg. Dominant pattern for steelhead and large trout in fall.',photo:'https://norrik.com/wp-content/uploads/2024/07/cheech-leech-streamer-small.jpg'},
      {name:'Sparkle Minnow',style:'Streamer',sizes:'4–8',hook:'Streamer',confidence:'High',weight:'Tungsten bead',tip:'Flash and movement trigger reaction strikes in off-color water and low light. Brown/yellow is the go-to color.',photo:'https://norrik.com/wp-content/uploads/2024/07/kreelex-minnow-small.jpg'}
    ]
  },
  // ─── ATTRACTOR / SEARCHING NYMPHS ────────────────────────────────────────
  {
    id:14, order:'attractor', emoji:'✨',
    name:'Attractor & Searching Nymphs', latin:'No hatch required',
    seasons:['spring','summer','fall','winter'], peakMonths:'Year-round',
    hatchTime:'Any', waterTemp:'Any',
    waterType:'All water types',
    description:"When there's no visible hatch, attractor patterns and searching nymphs are your best tool. These flies don't imitate any single insect but trigger strikes by suggesting food. The Copper John, Prince Nymph, and Hare's Ear are in virtually every serious angler's box worldwide.",
    stages:[
      {name:'Nymph',fly:'Copper John / Prince Nymph',sizes:'12–18',colors:['Copper','Red','Green','Gold'],waterLevel:'🪨 Bottom to mid-column — dead drift',desc:'Heavy attractor nymphs. Fish on the point in a two-fly Euro rig or under an indicator.'},
      {name:'Dry',fly:'Royal Wulff / Adams',sizes:'10–18',colors:['White wing','Red band','Mixed gray'],waterLevel:'🏄 Top water — searching dry fly',desc:'When nothing is hatching, tie on an attractor dry. Works in fast, pocket water where trout react instinctively.'},
      {name:'Soft Hackle',fly:'Soft Hackle Pheasant Tail',sizes:'12–16',colors:['Brown','Olive','Gold'],waterLevel:'💧 Mid-column on the swing',desc:'Soft hackle fibers pulse with life. Swing across and down in riffles — deadly for any stage of any insect.'},
      {name:'Worm',fly:'Squirmy Wormy / San Juan Worm',sizes:'10–14',colors:['Red','Pink','Coral','Natural'],waterLevel:'🪨 Bottom — dead drift tight to the bed',desc:'Aquatic worms are swept loose by current and rain events. The squirmy material wiggles with zero movement from the angler — trout eat it with confidence.'}
    ],
    topFlies:[
      {name:'Squirmy Wormy',style:'Nymph/Worm',sizes:'10–14',hook:'Standard nymph or jig',confidence:'High',weight:'Tungsten bead',tip:'The silicone tail wiggles on its own in current — trout treat it as a meal, not a fly. Red and pink year-round; coral after runoff. Fish on the bottom with a tight line or indicator. A guide secret weapon after rain.',photo:'https://norrik.com/wp-content/uploads/2024/07/girdle-bug-fly-small.jpg'},
      {name:'Copper John',style:'Nymph',sizes:'12–20',hook:'Standard nymph',confidence:'High',weight:'Tungsten bead',tip:'The most popular trout nymph in the US. Sinks fast, flashes in deep water. Fish on the point with a smaller dropper above.',photo:'https://norrik.com/wp-content/uploads/2024/07/copper-johns-nymph-small.jpg'},
      {name:'Prince Nymph',style:'Nymph',sizes:'12–18',hook:'Standard nymph',confidence:'High',weight:'Beadhead',tip:'White biot wings suggest an emerging wing. Irresistible searching pattern on freestone rivers. Been catching fish for 80+ years.',photo:'https://norrik.com/wp-content/uploads/2024/07/prince-nymph-small.jpg'},
      {name:'Royal Wulff',style:'Dry',sizes:'10–16',hook:'Dry fly',confidence:'High',weight:'None',tip:"Float in fast pocket water when no hatch is present. One of fly fishing's most beloved flies — visible and durable.",photo:'https://norrik.com/wp-content/uploads/2024/07/royal-wulff-small.jpg'},
      {name:'Soft Hackle Pheasant Tail',style:'Wet/Swing',sizes:'12–16',hook:'Standard nymph',confidence:'High',weight:'Unweighted',tip:'Swing across and downstream in riffles at the end of a drift. Imitates emerging caddis, mayflies, and midges all at once.',photo:'https://norrik.com/wp-content/uploads/2024/07/hares-ear-soft-hackle-small.jpg'},
      {name:'San Juan Worm',style:'Nymph/Worm',sizes:'10–16',hook:'Standard nymph',confidence:'High',weight:'Tungsten bead',tip:"Controversial but deadly. Especially effective after rain or in high water. Don't ignore it — guides use it constantly.",photo:'https://norrik.com/wp-content/uploads/2024/07/san-juan-worm.jpg'},
      {name:'Perdigon',style:'Nymph',sizes:'14–20',hook:'Jig nymph',confidence:'High',weight:'Tungsten bead',tip:'Ultra-thin, fast-sinking Euro nymph. Developed in competition fishing. Gets to the bottom in fast water faster than anything else.',photo:'https://norrik.com/wp-content/uploads/2024/07/perdigon-nymph-small.jpg'}
    ]
  },
  // ─── EGG PATTERNS ────────────────────────────────────────────────────────
  {
    id:15, order:'egg', emoji:'🟠',
    name:'Egg Patterns', latin:'Roe imitations',
    seasons:['fall','winter','spring'], peakMonths:'Sep–Mar',
    hatchTime:'During and after spawning runs', waterTemp:'38–52°F',
    waterType:'Tailwaters, salmon/steelhead rivers, Great Lakes tribs',
    description:"During fall and winter salmon and steelhead spawning runs, trout gorge on drifting eggs. Egg patterns are among the most productive flies of the season on many rivers. In the Great Lakes tributaries and Pacific Northwest, they can outfish every other pattern combined.",
    stages:[
      {name:'Single Egg',fly:'Glo Bug / Nuke Egg',sizes:'8–12',colors:['Peach','Pink','Orange','Chartreuse'],waterLevel:'🪨 Bottom — dead drift along riverbed',desc:'Single egg drifting with the current. Fish directly below spawning redds.'},
      {name:'Egg Cluster',fly:'Cluster Egg',sizes:'6–10',colors:['Peach','Orange','Salmon'],waterLevel:'🪨 Bottom — dead drift in seams',desc:'Clump of eggs sticks together after being washed downstream. More realistic in fast water.'}
    ],
    topFlies:[
      {name:'Glo Bug',style:'Egg',sizes:'8–12',hook:'Egg hook',confidence:'High',weight:'None',tip:'Peach or pink in clear water; chartreuse in stained water. Fish 8–12 inches off the bottom below indicator.',photo:'https://norrik.com/wp-content/uploads/2024/07/salmon-egg-fly-small.jpg'},
      {name:'Nuke Egg',style:'Egg',sizes:'10–14',hook:'Egg hook',confidence:'High',weight:'None',tip:'Smaller, more realistic profile than a Glo Bug. Excellent on pressured tailwaters where trout see eggs all day.',photo:'https://norrik.com/wp-content/uploads/2024/07/classic-mayfly-emerger-small.jpg'},
      {name:'Cluster Egg',style:'Egg',sizes:'8–12',hook:'Egg hook',confidence:'High',weight:'None',tip:'Multiple eggs clustered together — imitates a drifting egg mass. Highly visible and productive in stained or off-color water. Deadly for steelhead and Great Lakes trout in fall.',photo:'https://norrik.com/wp-content/uploads/2024/07/salmon-egg-fly-small.jpg'},
      {name:'Egg-Sucking Leech',style:'Egg/Streamer',sizes:'4–8',hook:'Streamer',confidence:'High',weight:'Tungsten bead',tip:"Double threat — egg on the nose, leech on the body. Dominant Great Lakes tributary fly. Also one of the best steelhead patterns you'll throw.",photo:'https://norrik.com/wp-content/uploads/2024/07/cheech-leech-streamer-small.jpg'}
    ]
  },
  // ─── GREEN DRAKE ─────────────────────────────────────────────────────────
  {
    id:18, order:'mayfly', emoji:'🪲',
    name:'Green Drake', latin:'Drunella grandis',
    seasons:['spring','summer'], peakMonths:'Jun–Jul',
    hatchTime:'Midday to afternoon', waterTemp:'50–62°F',
    waterType:'Spring creeks, freestones, Henry\'s Fork, Madison, Fryingpan',
    description:"The Green Drake is the most anticipated mayfly hatch in the West. These large mayflies (size 10–12) trigger explosive surface feeding from the biggest trout in the river. The Henry's Fork Railroad Ranch section is the most famous venue — fish that ignore everything else will throw caution to the wind for a well-presented Green Drake. Cloudy days produce the strongest hatches.",
    stages:[
      {name:'Nymph',fly:'Rubber Legs / Hare\'s Ear',sizes:'10–14',colors:['Olive','Brown'],waterLevel:'🪨 Bottom — slow to moderate currents',desc:'Clinger-style nymph. Crawls from substrate to the surface. Begin fishing nymphs 30–60 min before the hatch.'},
      {name:'Emerger',fly:'Cripple / Sparkle Dun (Olive)',sizes:'10–14',colors:['Olive body','Gray wing'],waterLevel:'〰️ Surface film — stuck during emergence',desc:'Trout key on cripples and stuck emergers more than perfect duns. Most important stage.'},
      {name:'Dun',fly:'Paradrake / Comparadun (Olive)',sizes:'10–14',colors:['Olive','Gray wing'],waterLevel:'🏄 Top water — riding high on surface',desc:'Large upright wing. Drifts slowly in smooth water. Highly selective fish will refuse a bad drift.'},
      {name:'Spinner',fly:'Olive Spinner',sizes:'10–14',colors:['Olive','Clear spent wings'],waterLevel:'🏄 Top water — spinner fall in evening',desc:'Spent spinners fall flat on the water. Fish focus on slow backwaters and edges.'}
    ],
    topFlies:[
      {name:'Paradrake (Olive)',style:'Dry',sizes:'10–14',hook:'Dry fly',confidence:'High',weight:'None',tip:"Al Troth's Paradrake is the go-to Green Drake dry on the Henry's Fork. The extended elk hair body and parachute post make it float well and land softly on flat water. Use 5X tippet minimum.",photo:'https://norrik.com/wp-content/uploads/2024/07/parachute-adams-small.jpg'},
      {name:'Comparadun (Olive)',style:'Dry',sizes:'10–14',hook:'Dry fly',confidence:'High',weight:'None',tip:'Low-riding deer hair wing sits in the film. More realistic profile than a parachute. Excellent for selective fish on spring creeks.',photo:'https://norrik.com/wp-content/uploads/2024/07/sparkle-dun-small.jpg'},
      {name:'Green Drake Cripple',style:'Emerger',sizes:'10–14',hook:'Dry fly',confidence:'High',weight:'None',tip:'Imitates a stuck or deformed emerger — the most vulnerable stage. Trout preferentially eat cripples during heavy hatches. Fish in or just below the film.',photo:'https://norrik.com/wp-content/uploads/2024/07/cripple-fly-small.jpg'},
      {name:'Olive Hare\'s Ear',style:'Nymph',sizes:'10–14',hook:'Standard nymph',confidence:'Med',weight:'Beadhead',tip:'General olive nymph before the hatch. Dead drift deep in the hour before flies appear on the surface.',photo:'https://norrik.com/wp-content/uploads/2024/07/hares-ear-nymph-small.jpg'}
    ]
  },
  // ─── BROWN DRAKE ─────────────────────────────────────────────────────────
  {
    id:19, order:'mayfly', emoji:'🪲',
    name:'Brown Drake', latin:'Ephemera simulans',
    seasons:['summer'], peakMonths:'Jun–Jul',
    hatchTime:'Evening, often after dark', waterTemp:'58–68°F',
    waterType:'Spring creeks, slow meadow runs, Henry\'s Fork, Madison',
    description:"Brown Drakes hatch in the evening — sometimes well after dark — bringing the largest trout in the river to the surface in calm, slow water. The Henry's Fork and Madison are legendary for this hatch. Brown Drakes are large (size 10–12), easy to see on the water, and trigger aggressive takes from fish that rarely show themselves during daylight.",
    stages:[
      {name:'Nymph',fly:'Brown Drake Nymph',sizes:'10–14',colors:['Brown','Tan'],waterLevel:'🪨 Bottom — slow sandy or silty substrate',desc:'Burrowing nymph. Lives in soft substrate. Swim toward surface at dusk.'},
      {name:'Dun',fly:'Brown Drake Comparadun',sizes:'10–12',colors:['Brown','Yellow belly','Mottled wing'],waterLevel:'🏄 Top water — evening hatch',desc:'Large brown mayfly riding the surface at dusk. One of the most exciting dry fly opportunities of the year.'},
      {name:'Spinner',fly:'Brown Drake Spinner',sizes:'10–12',colors:['Rusty brown','Clear spent wings'],waterLevel:'🏄 Top water — spinner fall after dark',desc:'Spinner falls happen in darkness. Fish by sound and by knowing where fish are holding. One of the most challenging and rewarding situations in fly fishing.'}
    ],
    topFlies:[
      {name:'Brown Drake Comparadun',style:'Dry',sizes:'10–12',hook:'Dry fly',confidence:'High',weight:'None',tip:'Low profile rides the film. Tie with a mottled brown/tan deer hair wing. Fish from last light onward — bring a headlamp.',photo:'https://norrik.com/wp-content/uploads/2024/07/sparkle-dun-small.jpg'},
      {name:'Brown Drake Spinner',style:'Spinner/Dry',sizes:'10–12',hook:'Dry fly',confidence:'High',weight:'None',tip:'Flat spent wings made of poly or CDC. Fish after dark in calm water. The strike is audible — wait for it before setting.',photo:'https://norrik.com/wp-content/uploads/2024/07/rusty-spinner-small.jpg'},
      {name:'Brown Drake Parachute',style:'Dry',sizes:'10–12',hook:'Dry fly',confidence:'High',weight:'None',tip:'High-visibility parachute post helps you track the fly in low light. Brown body with ginger hackle. A must-have for the evening hatch.',photo:'https://norrik.com/wp-content/uploads/2024/07/parachute-adams-small.jpg'}
    ]
  },
  // ─── MARCH BROWN ─────────────────────────────────────────────────────────
  {
    id:20, order:'mayfly', emoji:'🪲',
    name:'March Brown', latin:'Rhithrogena morrisoni / Maccaffertium vicarium',
    seasons:['spring'], peakMonths:'Mar–May',
    hatchTime:'Afternoon', waterTemp:'45–55°F',
    waterType:'Freestones, riffles, western and eastern rivers',
    description:"One of the first significant hatches of spring on both coasts. Western March Browns (Rhithrogena) hatch in fast riffles on rivers like the Henry's Fork and Yakima; eastern March Browns (Maccaffertium) are the classic Catskill hatch. Both produce excellent dry fly fishing when water temperatures are still cold. A great indicator that the season is starting.",
    stages:[
      {name:'Nymph',fly:'Hare\'s Ear / Pheasant Tail',sizes:'12–16',colors:['Brown','Olive-brown'],waterLevel:'🪨 Bottom — fast riffles',desc:'Clinger nymph. Fishes well through winter and into the hatch.'},
      {name:'Emerger',fly:'March Brown Soft Hackle',sizes:'12–16',colors:['Brown','Amber'],waterLevel:'〰️ Surface film — swinging in current',desc:'Swing a soft hackle through riffles during emergence. Deadly tactic.'},
      {name:'Dun',fly:'March Brown Comparadun / Adams',sizes:'12–16',colors:['Brown','Gray wing'],waterLevel:'🏄 Top water — afternoon hatch in riffles',desc:'Medium-large dun. Fish look up aggressively early in the season. One of the first chances for dry fly fishing each year.'}
    ],
    topFlies:[
      {name:'March Brown Comparadun',style:'Dry',sizes:'12–16',hook:'Dry fly',confidence:'High',weight:'None',tip:'Low profile works well in the riffles where March Browns hatch. Mottled brown body with gray deer hair wing. Fish with a reach cast to get a long drag-free drift.',photo:'https://norrik.com/wp-content/uploads/2024/07/sparkle-dun-small.jpg'},
      {name:'March Brown Soft Hackle',style:'Wet/Emerger',sizes:'12–16',hook:'Standard nymph',confidence:'High',weight:'Unweighted',tip:'Swing through riffle tailouts during emergence. The most productive tactic early in the season when fish aren\'t yet committed to the surface.',photo:'https://norrik.com/wp-content/uploads/2024/07/soft-hackle-nymph-small.jpg'},
      {name:'Adams (Size 14)',style:'Dry',sizes:'12–16',hook:'Dry fly',confidence:'High',weight:'None',tip:'The Parachute Adams in size 14 is a dead ringer for a March Brown dun. Always have some in your box for the early season.',photo:'https://norrik.com/wp-content/uploads/2024/07/parachute-adams-small.jpg'}
    ]
  },
  // ─── CALLIBAETIS ─────────────────────────────────────────────────────────
  {
    id:21, order:'mayfly', emoji:'🪲',
    name:'Callibaetis (Speckle-Wing Quill)', latin:'Callibaetis spp.',
    seasons:['spring','summer','fall'], peakMonths:'May–Sep',
    hatchTime:'Midmorning', waterTemp:'50–65°F',
    waterType:'Still water, lakes, slow spring creeks, reservoirs',
    description:"Callibaetis are the most important mayfly for stillwater fly fishing in the West. Found in lakes, ponds, and slow spring creeks from the Rockies to the Pacific Northwest, they produce classic midge-style rising fish in flat water. The speckled wing makes them easy to identify. A key hatch on western reservoirs, the Henry's Fork, and high mountain lakes.",
    stages:[
      {name:'Nymph',fly:'Pheasant Tail / Callibaetis Nymph',sizes:'14–18',colors:['Olive','Gray-brown'],waterLevel:'〰️ Mid-column — slow retrieve toward surface',desc:'Active swimmer. Strip slowly toward the surface or hang under an indicator near weed edges.'},
      {name:'Emerger',fly:'CDC Callibaetis Emerger',sizes:'14–18',colors:['Olive','Gray'],waterLevel:'〰️ Surface film — during emergence',desc:'Fish in the film during the hatch. Trout key on emergers before duns.'},
      {name:'Dun',fly:'Comparadun / Sparkle Dun (Gray)',sizes:'14–18',colors:['Gray','Speckled wing'],waterLevel:'🏄 Top water — midmorning hatch',desc:'Gray body with distinctive speckled wing. Fish in calm, flat water with light tippet.'},
      {name:'Spinner',fly:'Callibaetis Spinner',sizes:'14–18',colors:['Gray','Clear spent wings'],waterLevel:'🏄 Top water — late morning spinner fall',desc:'Spinner falls happen shortly after the dun hatch. Fish flat water with spent-wing patterns.'}
    ],
    topFlies:[
      {name:'Callibaetis Comparadun',style:'Dry',sizes:'14–18',hook:'Dry fly',confidence:'High',weight:'None',tip:'Gray deer hair wing with olive or gray body. Essential for still water and Henry\'s Fork fishing. Use 5X–6X tippet and a long leader on flat water.',photo:'https://norrik.com/wp-content/uploads/2024/07/sparkle-dun-small.jpg'},
      {name:'Pheasant Tail (Unweighted)',style:'Nymph',sizes:'14–18',hook:'Standard nymph',confidence:'High',weight:'Unweighted',tip:'The classic Callibaetis nymph imitation. Strip slowly or hang under an indicator in still water. Olive PT variation is especially effective.',photo:'https://norrik.com/wp-content/uploads/2024/07/pheasant-tail-nymph-small.jpg'},
      {name:'Callibaetis Spinner',style:'Spinner/Dry',sizes:'14–18',hook:'Dry fly',confidence:'High',weight:'None',tip:'Spent spinner with clear poly wings. Fish flat calm water after the dun hatch. One of the most underutilized patterns for stillwater trout.',photo:'https://norrik.com/wp-content/uploads/2024/07/classic-mayfly-emerger-small.jpg'}
    ]
  },
  // ─── SOW BUG / SCUD ──────────────────────────────────────────────────────
  {
    id:22, order:'attractor', emoji:'🦐',
    name:'Sow Bug & Scud', latin:'Asellus spp. / Gammarus spp.',
    seasons:['spring','summer','fall','winter'], peakMonths:'Year-round',
    hatchTime:'Year-round — not a hatch, constant food source', waterTemp:'33–75°F',
    waterType:'Spring creeks, tailwaters, weedy rivers — Green River, Bighorn, San Juan, Provo',
    description:"Sow bugs (aquatic isopods) and scuds (freshwater shrimp) are crustaceans, not insects — but they're among the most important food sources in many tailwaters. On rivers like the Green River, Bighorn, and San Juan, trout eat sow bugs and scuds year-round. They don't hatch, so trout are always looking for them near the bottom and in weed beds. Often overlooked by beginners but critical knowledge for tailwater fishing.",
    stages:[
      {name:'Sow Bug',fly:'Tailwater Sow Bug / Rojo Midge',sizes:'14–18',colors:['Gray','Olive-gray','Pink'],waterLevel:'🪨 Bottom — drifting along riverbed and in weeds',desc:'Flat-bodied aquatic isopod. Lives in moss and algae. Dead drift tight to the bottom year-round.'},
      {name:'Scud',fly:'Olive/Orange Scud',sizes:'12–18',colors:['Olive','Gray','Orange (dead)'],waterLevel:'🪨 Bottom — near weed beds and structure',desc:'Freshwater shrimp. Curls when dead (orange/pink). Trout eat both living (olive/gray) and dead (orange) scuds.'}
    ],
    topFlies:[
      {name:'Tailwater Sow Bug',style:'Nymph/Crustacean',sizes:'14–18',hook:'Standard nymph',confidence:'High',weight:'Unweighted or lightly weighted',tip:'The essential pattern on the Green River and Bighorn. Gray or olive-gray thread body, flat profile. Dead drift deep on a long leader. An absolute must-have on any western tailwater.',photo:'https://norrik.com/wp-content/uploads/2024/07/scud-nymph-fly-small.jpg'},
      {name:'Scud (Olive)',style:'Nymph/Crustacean',sizes:'12–18',hook:'Scud hook',confidence:'High',weight:'Beadhead or unweighted',tip:'Olive scuds imitate living freshwater shrimp. Fish near weed beds and undercut banks. A Bighorn and San Juan staple year-round.',photo:'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Scud_fly_pattern.jpg/320px-Scud_fly_pattern.jpg'},
      {name:'Scud (Orange)',style:'Nymph/Crustacean',sizes:'12–16',hook:'Scud hook',confidence:'High',weight:'Beadhead',tip:'Dead/dying scuds turn orange. This is often more visible to trout. On the Green River and Provo, an orange scud fished deep can be the best fly in the box on slow days.',photo:'https://norrik.com/wp-content/uploads/2024/07/scud-orange-small.jpg'},
      {name:'Rojo Midge',style:'Nymph/Midge',sizes:'18–22',hook:'Midge',confidence:'High',weight:'Beadhead',tip:"Jay Zimmerman's red bead midge is deadly on the South Platte, Green River, and Provo. Fishes like a sow bug and a midge larva simultaneously. Always have some in your box.",photo:'https://norrik.com/wp-content/uploads/2024/07/gray-midge-emerger-small.jpg'}
    ]
  }
];


const C = {
  forest:'#1a2e1a', moss:'#2d4a2d', fern:'#3d6b3d', sage:'#7a9e7a',
  water:'#2a4a5e', sky:'#5b9abf', cream:'#f4f0e6', sand:'#e8e0cc',
  amber:'#c8842a', stone:'#8a8070'
};

const ORDER_LABELS = { mayfly:'Mayflies', caddis:'Caddisflies', stonefly:'Stoneflies', midge:'Midges', terrestrial:'Terrestrials', streamer:'Streamers', attractor:'Attractor/Nymphs', egg:'Egg Patterns' };

// Real insect photos (iNaturalist - stable observation photos)
const INSECT_PHOTOS = {
  // Mayflies
  1:  'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Baetis_rhodani_crop.jpg/320px-Baetis_rhodani_crop.jpg',
  2:  'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Ephemerella_inermis.jpg/320px-Ephemerella_inermis.jpg',
  17: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Ephemerella_dorothea.jpg/320px-Ephemerella_dorothea.jpg',
  3:  'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Drunella_grandis.jpg/320px-Drunella_grandis.jpg',
  9:  'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Tricorythodes_minutus.jpg/320px-Tricorythodes_minutus.jpg',
  10: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Ephemerella_subvaria.jpg/320px-Ephemerella_subvaria.jpg',
  18: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Drunella_grandis.jpg/320px-Drunella_grandis.jpg',
  19: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Ephemera_simulans.jpg/320px-Ephemera_simulans.jpg',
  20: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Rhithrogena_germanica.jpg/320px-Rhithrogena_germanica.jpg',
  21: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Callibaetis_sp.jpg/320px-Callibaetis_sp.jpg',
  // Caddisflies
  4:  'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Caddisfly_-_Trichoptera.jpg/320px-Caddisfly_-_Trichoptera.jpg',
  16: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Dicosmoecus_gilvipes.jpg/320px-Dicosmoecus_gilvipes.jpg',
  // Stoneflies
  5:  'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Pteronarcys_californica.jpg/320px-Pteronarcys_californica.jpg',
  6:  'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Hesperoperla_pacifica.jpg/320px-Hesperoperla_pacifica.jpg',
  // Midges
  7:  'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Chironomus_plumosus2.jpg/320px-Chironomus_plumosus2.jpg',
  // Terrestrials
  8:  'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Melanoplus_differentialis.jpg/320px-Melanoplus_differentialis.jpg',
  11: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Ant_head_LE.jpg/320px-Ant_head_LE.jpg',
  // Streamers / Leeches
  12: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Oncorhynchus_mykiss.jpg/320px-Oncorhynchus_mykiss.jpg',
  13: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Macrobdella_decora.jpg/320px-Macrobdella_decora.jpg',
  // Attractors
  14: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Trout_fishing_fly.jpg/320px-Trout_fishing_fly.jpg',
  // Eggs
  15: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Oncorhynchus_tshawytscha_eggs.jpg/320px-Oncorhynchus_tshawytscha_eggs.jpg',
  // Scud
  22: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Gammarus_pulex.jpg/320px-Gammarus_pulex.jpg',
};
const SEASON_ICONS = { spring:'Sp', summer:'Su', fall:'Fa', winter:'Wi' };

function CameraIcon({size=20,color='currentColor'}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
      <circle cx="12" cy="13" r="4"/>
    </svg>
  );
}
function BookIcon({size=20,color='currentColor'}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
    </svg>
  );
}
function ArrowLeft({size=14,color='currentColor'}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="12" x2="5" y2="12"/>
      <polyline points="12 19 5 12 12 5"/>
    </svg>
  );
}
function ArrowRight({size=14,color='currentColor'}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"/>
      <polyline points="12 5 19 12 12 19"/>
    </svg>
  );
}
function ChevronDown({size=14,color='currentColor'}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  );
}
function SearchIcon({size=14,color='currentColor'}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/>
      <line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  );
}
function CloseIcon({size=14,color='currentColor'}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  );
}



// Verified photo URLs for each fly — fetched via corsproxy.io to bypass CORS
const FLY_PHOTOS = {
  'parachute adams':      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Parachute_Adams.jpg/320px-Parachute_Adams.jpg',
  'sparkle dun':          'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Sparkle_Dun.jpg/320px-Sparkle_Dun.jpg',
  'pheasant tail nymph':  'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Pheasant_tail_nymph.jpg/320px-Pheasant_tail_nymph.jpg',
  'elk hair caddis':      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Elk_Hair_Caddis.jpg/320px-Elk_Hair_Caddis.jpg',
  "griffith's gnat":      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Griffiths_Gnat.jpg/320px-Griffiths_Gnat.jpg',
  'hares ear nymph':      'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/GoldRibbedHaresEar.jpg/320px-GoldRibbedHaresEar.jpg',
  'parachute green drake':'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Green_Drake_fly.jpg/320px-Green_Drake_fly.jpg',
  'zebra midge':          'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Zebra_midge.jpg/320px-Zebra_midge.jpg',
  "dave's hopper":        'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Dave%27s_hopper.jpg/320px-Dave%27s_hopper.jpg',
};

const PROXY = 'https://corsproxy.io/?';

function ImgWithFallback({src, flyName='', style, fallbackText='No photo'}) {
  const [status, setStatus] = useState('loading');
  const [attempt, setAttempt] = useState(0);

  const urls = useMemo(() => {
    const list = [];
    const key = flyName.toLowerCase();
    if (FLY_PHOTOS[key]) list.push(FLY_PHOTOS[key]);
    if (src) list.push(src);
    return list;
  }, [src, flyName]);

  const currentUrl = urls[attempt];

  if (!currentUrl || status === 'error') {
    return (
      <div style={{...style, display:'flex', alignItems:'center', justifyContent:'center',
        background:'rgba(255,255,255,0.04)', flexDirection:'column', gap:4}}>
        <span style={{fontSize:'1.5rem'}}>🪝</span>
        <span style={{color:'#7a9e7a', fontSize:'0.7rem', textAlign:'center', padding:'0 8px'}}>{flyName || fallbackText}</span>
      </div>
    );
  }

  return (
    <img
      key={currentUrl}
      src={currentUrl}
      alt={flyName}
      style={{...style, display: status === 'loading' ? 'none' : 'block'}}
      onLoad={() => setStatus('ok')}
      onError={() => {
        if (attempt + 1 < urls.length) {
          setAttempt(a => a + 1);
          setStatus('loading');
        } else {
          setStatus('error');
        }
      }}
    />
  );
}

function LogoIcon({size=120}) {
  const s = size / 150;
  return (
    <svg width={size} height={size} viewBox="0 0 150 150" fill="none">
      <rect width="150" height="150" rx="32" fill="#f4f0e6"/>
      <rect x="6" y="42" width="96" height="62" rx="12" fill="#1a2e1a"/>
      <rect x="14" y="48" width="14" height="10" rx="3" fill="#2a4a2a"/>
      <rect x="15" y="49" width="12" height="8" rx="2" fill="#3a6a3a" opacity="0.5"/>
      <rect x="72" y="46" width="22" height="14" rx="4" fill="#2a4a2a"/>
      <circle cx="83" cy="53" r="3" fill="#f4f0e6" opacity="0.15"/>
      <rect x="50" y="38" width="22" height="8" rx="4" fill="#1a2e1a"/>
      <rect x="54" y="39" width="14" height="6" rx="3" fill="#c8842a"/>
      <circle cx="38" cy="73" r="22" fill="#0f1a0f" stroke="#1a2e1a" stroke-width="2"/>
      <circle cx="38" cy="73" r="16" fill="#0a1008" stroke="#2a4a2a" stroke-width="0.8"/>
      <circle cx="38" cy="73" r="9" fill="#060e06"/>
      <circle cx="42" cy="68" r="2.5" fill="white" opacity="0.1"/>
      <rect x="56" y="95" width="36" height="5" rx="2.5" fill="#2a4a2a"/>
      <circle cx="68" cy="97" r="3" fill="#3d6b3d"/>
      <circle cx="104" cy="90" r="36" fill="#c8842a"/>
      <circle cx="104" cy="90" r="28" fill="#a86c1a"/>
      <line x1="128" y1="116" x2="144" y2="136" stroke="#c8842a" stroke-width="8" stroke-linecap="round"/>
      <g transform="translate(104,90)">
        <path d="M-2 -4 C-10 -10 -28 -8 -30 0 C-32 8 -20 14 -8 9" stroke="#1a2e1a" stroke-width="2" fill="rgba(26,46,26,0.18)" strokeLinejoin="round"/>
        <path d="M-2 -4 C-8 -8 -20 -7 -22 -1 C-24 5 -14 9 -6 6" stroke="#1a2e1a" stroke-width="1.1" fill="rgba(26,46,26,0.1)" opacity="0.7"/>
        <path d="M2 -4 C10 -10 28 -8 30 0 C32 8 20 14 8 9" stroke="#1a2e1a" stroke-width="2" fill="rgba(26,46,26,0.18)" strokeLinejoin="round"/>
        <path d="M2 -4 C8 -8 20 -7 22 -1 C24 5 14 9 6 6" stroke="#1a2e1a" stroke-width="1.1" fill="rgba(26,46,26,0.1)" opacity="0.7"/>
        <rect x="-4.5" y="-14" width="9" height="30" rx="4.5" fill="#1a2e1a"/>
        <ellipse cx="0" cy="-16" rx="6" ry="5" fill="#1a2e1a"/>
        <path d="M-3 16 C-5 24 -7 30 -10 32" stroke="#1a2e1a" stroke-width="2.2" stroke-linecap="round"/>
        <path d="M3 16 C5 24 7 30 10 32" stroke="#1a2e1a" stroke-width="2.2" stroke-linecap="round"/>
        <path d="M-3 -20 C-6 -28 -9 -33 -12 -33" stroke="#1a2e1a" stroke-width="1.4" stroke-linecap="round"/>
        <path d="M3 -20 C6 -28 9 -33 12 -33" stroke="#1a2e1a" stroke-width="1.4" stroke-linecap="round"/>
      </g>
    </svg>
  );
}

function LogoWithWordmark() {
  return (
    <div style={{display:'flex', flexDirection:'column', alignItems:'center', gap:14}}>
      <LogoIcon size={110}/>
      <div>
        <div style={{fontFamily:'Georgia,serif', color:'#f4f0e6', fontSize:'2rem', letterSpacing:'-0.02em', lineHeight:1, textAlign:'center'}}>
          Hatch<span style={{color:'#5b9abf', fontStyle:'italic'}}>Match</span>
        </div>
        <div style={{fontSize:'0.58rem', letterSpacing:'0.22em', textTransform:'uppercase', color:'#7a9e7a', textAlign:'center', marginTop:6}}>Match the Hatch</div>
      </div>
    </div>
  );
}

export default function HatchMatch() {
  const [view, setView] = useState('home');
  const [order, setOrder] = useState('all');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalStep, setModalStep] = useState('upload');
  const [imageUrl, setImageUrl] = useState(null);
  const [apiKey, setApiKey] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [stepIdx, setStepIdx] = useState(0);
  const stepTimer = useRef();

  const filtered = DB.filter(ins => {
    const orderOk = order === 'all' || ins.order === order;
    const q = search.toLowerCase();
    return orderOk && (!q || ins.name.toLowerCase().includes(q) || ins.latin.toLowerCase().includes(q) || ins.topFlies.some(f => f.name.toLowerCase().includes(q)));
  });

  const groups = filtered.reduce((acc, ins) => {
    if (!acc[ins.order]) acc[ins.order] = [];
    acc[ins.order].push(ins);
    return acc;
  }, {});

  function handleFile(file) {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = e => { setImageUrl(e.target.result); setModalStep('preview'); };
    reader.readAsDataURL(file);
  }

  function openModal() { setShowModal(true); setModalStep('upload'); setImageUrl(null); setResult(null); setError(null); }
  function closeModal() { setShowModal(false); clearInterval(stepTimer.current); }
  function selectInsect(id) { setSelected(id); setView('detail'); }

  async function identify() {
    if (!imageUrl || !apiKey.trim()) { setError('Enter your Anthropic API key first.'); setModalStep('error'); return; }
    setModalStep('analyzing'); setStepIdx(0);
    stepTimer.current = setInterval(() => setStepIdx(i => i + 1), 1200);
    const b64 = imageUrl.split(',')[1];
    const mime = imageUrl.split(';')[0].split(':')[1];
    const prompt = 'You are an expert fly fishing entomologist. Identify this insect photo for a fly fisherman. Return ONLY valid JSON, no markdown:\n{"identified":true,"commonName":"Blue-Winged Olive","latinName":"Baetis spp.","order":"mayfly","confidence":"high","lifeStage":"Dun","stageDescription":"Adult dun on water surface","primaryFly":"Parachute Adams","primaryFlyStyle":"Dry","primaryFlySizes":"16-20","primaryFlyTip":"Fish dead drift","presentation":{"cast":"Reach cast","drift":"Dead drift","depth":"Surface","strike":"Lift firmly"},"rigging":{"setup":"9ft 5X leader","tippet":"5X fluorocarbon","indicator":"None","dropper":"RS2 12in below","weight":"None"},"alternateFlies":[{"name":"Sparkle Dun","style":"Dry","sizes":"16-18"}],"fishingNotes":"Fish rising selectively.","notAnInsect":false,"notAnInsectReason":""}\nIf not identifiable set identified:false notAnInsect:true. Life stage: Nymph/Pupa/Emerger/Dun/Adult/Spinner. Order: mayfly/caddis/stonefly/midge/terrestrial/unknown. Confidence: high/medium/low.';
    try {
      const resp = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'anthropic-version': '2023-06-01', 'anthropic-dangerous-direct-browser-access': 'true', 'x-api-key': apiKey.trim() },
        body: JSON.stringify({ model: 'claude-sonnet-4-5-20251001', max_tokens: 1200, messages: [{ role: 'user', content: [{ type: 'image', source: { type: 'base64', media_type: mime, data: b64 } }, { type: 'text', text: prompt }] }] })
      });
      clearInterval(stepTimer.current);
      const data = await resp.json();
      const txt = (data.content || []).filter(b => b.type === 'text').map(b => b.text).join('');
      const m = txt.match(/\{[\s\S]*\}/);
      if (!m) throw new Error('No JSON in response');
      setResult(JSON.parse(m[0])); setModalStep('results');
    } catch(e) { clearInterval(stepTimer.current); setError(e.message); setModalStep('error'); }
  }

  function findPhoto(name) {
    for (const ins of DB) for (const f of ins.topFlies) if (f.photo && f.name.toLowerCase() === (name||'').toLowerCase()) return f.photo;
    return null;
  }

  const selectedIns = DB.find(i => i.id === selected);
  const backLabel = view === 'detail' ? 'Library' : 'Home';

  return (
    <div style={{fontFamily:'system-ui,-apple-system,sans-serif', background:C.cream, minHeight:'100vh', color:C.forest, boxSizing:'border-box'}}>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeUp { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }
        .fu { animation: fadeUp 0.35s ease forwards; }
        * { box-sizing: border-box; }
        .dsb { display: none; }
        .mch { display: flex; }
        @media (min-width: 641px) { .dsb { display: block; } .mch { display: none; } }
      `}</style>

      {view !== 'home' && (
        <div style={{background:C.forest, position:'sticky', top:0, zIndex:50, boxShadow:'0 2px 16px rgba(0,0,0,0.3)'}}>
          <div style={{display:'flex', alignItems:'center', padding:'12px 16px', gap:12}}>
            <button
              onClick={() => setView(view === 'detail' ? 'library' : 'home')}
              style={{background:'rgba(255,255,255,0.08)', border:'1px solid rgba(255,255,255,0.14)', color:C.cream, cursor:'pointer', padding:'7px 12px', borderRadius:8, display:'flex', alignItems:'center', gap:6, fontSize:'0.82rem', fontWeight:500}}
            >
              <ArrowLeft size={13} color={C.cream}/> {backLabel}
            </button>
            <div style={{flex:1, display:'flex', justifyContent:'center'}}>
              <LogoIcon size={36}/>
            </div>
            {view === 'library' && (
              <button
                onClick={openModal}
                style={{display:'flex', alignItems:'center', gap:6, background:C.amber, border:'none', color:'white', padding:'8px 14px', borderRadius:8, cursor:'pointer', fontSize:'0.82rem', fontWeight:600}}
              >
                <CameraIcon size={14} color="white"/> Identify
              </button>
            )}
          </div>
          {view === 'library' && (
            <div>
              <div style={{display:'flex', alignItems:'center', gap:8, background:'rgba(255,255,255,0.1)', border:'1px solid rgba(255,255,255,0.12)', borderRadius:8, padding:'8px 12px', margin:'0 16px 10px'}}>
                <SearchIcon size={13} color="rgba(255,255,255,0.35)"/>
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search insects or fly patterns..."
                  style={{background:'none', border:'none', outline:'none', color:'white', fontSize:'0.86rem', width:'100%'}}
                />
              </div>
              <div style={{display:'flex', gap:6, padding:'0 16px 10px', overflowX:'auto', scrollbarWidth:'none'}}>
                {['all','mayfly','caddis','stonefly','midge','terrestrial','streamer','attractor','egg'].map(o => (
                  <button
                    key={o}
                    onClick={() => setOrder(o)}
                    style={{
                      flexShrink:0,
                      background: order===o ? C.sky : 'rgba(255,255,255,0.08)',
                      border: order===o ? '1px solid ' + C.sky : '1px solid rgba(255,255,255,0.12)',
                      color: order===o ? 'white' : 'rgba(255,255,255,0.65)',
                      padding:'7px 15px', borderRadius:20, fontSize:'0.82rem', cursor:'pointer', whiteSpace:'nowrap',
                      fontWeight: order===o ? 600 : 400
                    }}
                  >
                    {o==='all' ? 'All' : ORDER_LABELS[o]}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {view === 'home' && (
        <div className="fu" style={{maxWidth:480, margin:'0 auto', paddingBottom:48}}>
          <div style={{background:C.forest, padding:'52px 28px 44px', textAlign:'center', position:'relative', overflow:'hidden'}}>
            <div style={{position:'absolute', inset:0, backgroundImage:'repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(255,255,255,0.015) 40px, rgba(255,255,255,0.016) 41px)', pointerEvents:'none'}}/>
            <div style={{position:'relative'}}>
              <div style={{display:'flex', justifyContent:'center', marginBottom:20}}>
                <LogoWithWordmark/>
              </div>
              <div style={{color:C.sage, fontSize:'0.88rem', marginBottom:40, lineHeight:1.6}}>
                Snap a bug. Know exactly what fly to tie on.
              </div>
              <button
                onClick={openModal}
                style={{width:'100%', maxWidth:320, background:C.amber, border:'none', color:'white', padding:'18px 24px', borderRadius:14, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:14, margin:'0 auto'}}
              >
                <div style={{width:42, height:42, background:'rgba(255,255,255,0.15)', borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0}}>
                  <CameraIcon size={22} color="white"/>
                </div>
                <div style={{textAlign:'left'}}>
                  <div style={{fontSize:'1rem', fontWeight:700, letterSpacing:'-0.01em'}}>Identify an Insect</div>
                  <div style={{fontSize:'0.74rem', opacity:0.82, marginTop:2}}>Instant hatch matching</div>
                </div>
              </button>
              <div style={{color:'rgba(255,255,255,0.2)', fontSize:'0.68rem', marginTop:18, fontStyle:'italic'}}>
                Works best with close-up photos in natural light
              </div>
            </div>
          </div>

          <div style={{padding:'28px 24px 20px', borderBottom:'1px solid rgba(0,0,0,0.07)'}}>
            <div style={{fontSize:'0.62rem', letterSpacing:'0.14em', textTransform:'uppercase', color:C.stone, fontWeight:700, marginBottom:10}}>Built for every angler</div>
            <p style={{fontSize:'0.88rem', color:'#555', lineHeight:1.7, margin:0}}>
              Whether you picked up a rod last week or have been reading the water for decades, HatchMatch gives you the knowledge of an experienced guide — in your pocket, on the river.
            </p>
          </div>

          <div style={{padding:'18px 20px'}}>
            <button
              onClick={() => setView('library')}
              style={{width:'100%', background:'white', border:'1px solid rgba(0,0,0,0.09)', borderRadius:14, padding:'20px', cursor:'pointer', textAlign:'left', display:'flex', alignItems:'center', gap:16, boxShadow:'0 1px 6px rgba(0,0,0,0.06)'}}
            >
              <div style={{width:48, height:48, background:C.forest, borderRadius:12, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0}}>
                <BookIcon size={22} color={C.sage}/>
              </div>
              <div style={{flex:1}}>
                <div style={{fontSize:'1rem', fontWeight:700, color:C.forest, marginBottom:3}}>Fly Library</div>
                <div style={{fontSize:'0.8rem', color:C.stone, lineHeight:1.5}}>Browse hatches, life stages, and fly patterns. Learn the why behind each imitation.</div>
              </div>
              <ArrowRight size={16} color={C.stone}/>
            </button>
          </div>

          <div style={{padding:'4px 24px 0'}}>
            <div style={{fontSize:'0.62rem', letterSpacing:'0.14em', textTransform:'uppercase', color:C.stone, fontWeight:700, marginBottom:16}}>What you will learn</div>
            {[
              ['Life stages', 'Understand the full lifecycle of each insect and which stage trout are feeding on.'],
              ['Presentation', 'How to cast, drift, and strike — not just which fly to tie on.'],
              ['Rigging', 'Leader length, tippet size, indicator setup, and dropper configurations.'],
              ['Water column', 'Whether fish are eating on top, just below the surface, or deep.'],
            ].map(([title, desc]) => (
              <div key={title} style={{display:'flex', gap:14, marginBottom:18}}>
                <div style={{width:3, background:C.fern, borderRadius:2, flexShrink:0, minHeight:44}}/>
                <div>
                  <div style={{fontSize:'0.86rem', fontWeight:700, color:C.forest, marginBottom:3}}>{title}</div>
                  <div style={{fontSize:'0.8rem', color:'#666', lineHeight:1.55}}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {view === 'library' && (
        <div style={{padding:'12px 14px 80px', overflowY:'auto'}}>
          {filtered.length === 0 && <div style={{padding:'20px 4px', color:C.stone, fontSize:'0.82rem'}}>No results.</div>}
          {Object.entries(groups).map(([ord, insects]) => (
            <div key={ord} style={{marginBottom:28}}>
              <div style={{fontSize:'0.75rem', letterSpacing:'0.1em', textTransform:'uppercase', color:C.forest, fontWeight:800, marginBottom:10, paddingLeft:2, fontFamily:'Georgia,serif'}}>{ORDER_LABELS[ord]}</div>
              <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:10}}>
                {insects.map(ins => (
                  <div
                    key={ins.id}
                    onClick={() => selectInsect(ins.id)}
                    style={{background:'white', borderRadius:14, overflow:'hidden', boxShadow:'0 2px 8px rgba(0,0,0,0.07)', cursor:'pointer', border: selected===ins.id ? '2px solid ' + C.fern : '2px solid transparent'}}
                  >
                    <div style={{height:90, background:C.forest, overflow:'hidden'}}>
                      {INSECT_PHOTOS[ins.id] ? (
                        <ImgWithFallback
                          src={INSECT_PHOTOS[ins.id]}
                          alt={ins.name}
                          style={{width:'100%', height:'100%', objectFit:'cover'}}
                        />
                      ) : (
                        <div style={{width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                          <span style={{fontSize:'0.65rem', color:'rgba(255,255,255,0.3)', fontStyle:'italic'}}>No photo</span>
                        </div>
                      )}
                    </div>
                    <div style={{padding:'8px 10px 10px'}}>
                      <div style={{fontSize:'0.78rem', fontWeight:700, color:C.forest, lineHeight:1.3}}>{ins.name}</div>
                      <div style={{fontSize:'0.6rem', color:C.stone, fontStyle:'italic', marginTop:2}}>{ins.latin}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {view === 'detail' && selectedIns && (
        <div style={{padding:'20px 16px 48px'}}>
          <InsectDetail ins={selectedIns}/>
        </div>
      )}

      {showModal && (
        <div
          onClick={e => { if (e.target === e.currentTarget) closeModal(); }}
          style={{position:'fixed', inset:0, zIndex:9000, background:'rgba(0,0,0,0.82)', display:'flex', alignItems:'flex-end', justifyContent:'center'}}
        >
          <div style={{background:C.forest, width:'100%', maxWidth:520, borderRadius:'20px 20px 0 0', maxHeight:'92vh', overflowY:'auto'}}>
            <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', padding:'20px 22px 16px', borderBottom:'1px solid rgba(255,255,255,0.07)'}}>
              <div>
                <div style={{fontFamily:'Georgia,serif', color:C.cream, fontSize:'1.15rem'}}>Identify Insect</div>
                <div style={{fontSize:'0.72rem', color:C.sage, marginTop:2}}>Photo a bug — we will match the hatch</div>
              </div>
              <button
                onClick={closeModal}
                style={{background:'rgba(255,255,255,0.08)', border:'1px solid rgba(255,255,255,0.1)', color:'rgba(255,255,255,0.7)', width:32, height:32, borderRadius:'50%', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center'}}
              >
                <CloseIcon size={14}/>
              </button>
            </div>

            <div style={{padding:'20px 22px 44px'}}>
              {modalStep === 'upload' && (
                <div>
                  <div style={{border:'2px dashed rgba(255,255,255,0.14)', borderRadius:14, padding:'32px 16px', textAlign:'center', marginBottom:16}}>
                    <div style={{width:52, height:52, background:'rgba(255,255,255,0.07)', borderRadius:14, display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 14px'}}>
                      <CameraIcon size={24} color={C.sage}/>
                    </div>
                    <div style={{fontFamily:'Georgia,serif', color:C.cream, fontSize:'1rem', marginBottom:6}}>Photo your insect</div>
                    <div style={{color:C.sage, fontSize:'0.78rem', marginBottom:22, lineHeight:1.55}}>
                      A clear, close-up photo works best. Look on rocks, leaves, or the water surface.
                    </div>
                    <div style={{display:'flex', gap:10, justifyContent:'center', flexWrap:'wrap'}}>
                      <label style={{display:'inline-flex', alignItems:'center', gap:8, background:'rgba(255,255,255,0.09)', border:'1px solid rgba(255,255,255,0.18)', color:C.cream, padding:'11px 20px', borderRadius:9, fontSize:'0.84rem', cursor:'pointer', fontWeight:500}}>
                        <CameraIcon size={15} color={C.cream}/> Take Photo
                        <input type="file" accept="image/*" capture="environment" style={{display:'none'}} onChange={e => handleFile(e.target.files[0])}/>
                      </label>
                      <label style={{display:'inline-flex', alignItems:'center', gap:8, background:'rgba(255,255,255,0.09)', border:'1px solid rgba(255,255,255,0.18)', color:C.cream, padding:'11px 20px', borderRadius:9, fontSize:'0.84rem', cursor:'pointer', fontWeight:500}}>
                        Upload Photo
                        <input type="file" accept="image/*" style={{display:'none'}} onChange={e => handleFile(e.target.files[0])}/>
                      </label>
                    </div>
                  </div>
                  <div style={{background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:10, padding:'13px 14px'}}>
                    <div style={{fontSize:'0.62rem', letterSpacing:'0.12em', textTransform:'uppercase', color:C.sage, marginBottom:7, fontWeight:700}}>Anthropic API Key</div>
                    <input
                      type="password"
                      value={apiKey}
                      onChange={e => setApiKey(e.target.value)}
                      placeholder="sk-ant-..."
                      style={{width:'100%', background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.12)', borderRadius:7, padding:'9px 11px', color:'white', fontSize:'0.82rem', outline:'none'}}
                    />
                    <div style={{color:C.stone, fontSize:'0.68rem', marginTop:6, lineHeight:1.4}}>Get a key at console.anthropic.com — used only in this session.</div>
                  </div>
                </div>
              )}

              {modalStep === 'preview' && (
                <div>
                  <div style={{position:'relative', borderRadius:12, overflow:'hidden', marginBottom:14}}>
                    <img src={imageUrl} style={{width:'100%', maxHeight:260, objectFit:'cover', display:'block'}}/>
                    <button
                      onClick={() => setModalStep('upload')}
                      style={{position:'absolute', bottom:10, right:10, background:'rgba(0,0,0,0.65)', border:'1px solid rgba(255,255,255,0.2)', color:'white', padding:'5px 12px', borderRadius:6, fontSize:'0.72rem', cursor:'pointer'}}
                    >
                      Change
                    </button>
                  </div>
                  <button
                    onClick={identify}
                    style={{width:'100%', padding:15, background:C.amber, border:'none', color:'white', borderRadius:10, fontSize:'0.95rem', fontWeight:700, cursor:'pointer'}}
                  >
                    Identify and Match Flies
                  </button>
                </div>
              )}

              {modalStep === 'analyzing' && (
                <div>
                  <div style={{borderRadius:12, overflow:'hidden', marginBottom:18}}>
                    <img src={imageUrl} style={{width:'100%', maxHeight:200, objectFit:'cover', display:'block', opacity:0.4, filter:'blur(3px)'}}/>
                  </div>
                  <div style={{textAlign:'center', paddingBottom:8}}>
                    <div style={{width:44, height:44, border:'3px solid rgba(255,255,255,0.08)', borderTopColor:C.amber, borderRadius:'50%', animation:'spin 0.85s linear infinite', margin:'0 auto 16px'}}/>
                    <div style={{fontFamily:'Georgia,serif', color:C.cream, fontSize:'1rem', marginBottom:4}}>Analyzing</div>
                    <div style={{color:C.stone, fontSize:'0.76rem', marginBottom:18}}>Reading species, stage, and conditions</div>
                    {['Identifying species and order', 'Detecting life stage', 'Matching fly patterns'].map((s, i) => (
                      <div
                        key={i}
                        style={{
                          display:'flex', alignItems:'center', gap:10, padding:'9px 12px',
                          background: stepIdx===i ? 'rgba(200,132,42,0.12)' : 'rgba(255,255,255,0.03)',
                          border: stepIdx===i ? '1px solid rgba(200,132,42,0.25)' : '1px solid transparent',
                          borderRadius:8, fontSize:'0.78rem',
                          color: stepIdx>i ? '#7bc97b' : stepIdx===i ? C.cream : C.stone,
                          marginBottom:6
                        }}
                      >
                        <div style={{width:6, height:6, borderRadius:'50%', background: stepIdx>i ? '#7bc97b' : stepIdx===i ? C.amber : C.stone, flexShrink:0}}/>
                        {s}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {modalStep === 'results' && result && (
                <ResultView result={result} findPhoto={findPhoto} onNew={() => setModalStep('upload')} onView={id => { closeModal(); selectInsect(id); }}/>
              )}

              {modalStep === 'error' && (
                <div style={{textAlign:'center', padding:'28px 0'}}>
                  <div style={{width:48, height:48, background:'rgba(200,80,80,0.15)', borderRadius:12, display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 14px'}}>
                    <CloseIcon size={20} color="#e08080"/>
                  </div>
                  <div style={{fontFamily:'Georgia,serif', color:C.cream, fontSize:'1rem', marginBottom:8}}>Something went wrong</div>
                  <div style={{color:C.sage, fontSize:'0.82rem', marginBottom:20, lineHeight:1.5}}>{error}</div>
                  <button onClick={() => setModalStep('upload')} style={{padding:'10px 24px', background:C.moss, border:'1px solid rgba(255,255,255,0.15)', color:'white', borderRadius:8, fontSize:'0.88rem', fontWeight:600, cursor:'pointer'}}>Try Again</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function InsectDetail({ins}) {
  const flyPhotos = {};
  ins.topFlies.forEach(f => { if (f.photo) flyPhotos[f.name.toLowerCase()] = f.photo; });
  function stagePhoto(name) {
    if (!name) return null;
    for (const p of name.split('/').map(s => s.trim())) {
      if (flyPhotos[p.toLowerCase()]) return flyPhotos[p.toLowerCase()];
    }
    return null;
  }
  return (
    <div>
      <div style={{paddingBottom:24, marginBottom:24, borderBottom:'1px solid rgba(0,0,0,0.08)'}}>
        <h2 style={{fontFamily:'Georgia,serif', fontSize:'1.8rem', marginBottom:4, letterSpacing:'-0.02em'}}>{ins.name}</h2>
        <div style={{fontFamily:'Georgia,serif', fontStyle:'italic', color:C.stone, fontSize:'0.88rem', marginBottom:12}}>{ins.latin}</div>
        <div style={{display:'flex', gap:6, flexWrap:'wrap', marginBottom:14}}>
          <span style={{padding:'3px 10px', borderRadius:20, fontSize:'0.7rem', fontWeight:600, background:C.forest, color:C.cream}}>{ins.order.charAt(0).toUpperCase()+ins.order.slice(1)}</span>
          {ins.seasons.map(s => (
            <span key={s} style={{padding:'3px 10px', borderRadius:20, fontSize:'0.7rem', fontWeight:600, background:C.fern, color:'white'}}>{s.charAt(0).toUpperCase()+s.slice(1)}</span>
          ))}
        </div>
        <p style={{fontSize:'0.88rem', lineHeight:1.7, color:'#444', margin:0}}>{ins.description}</p>
      </div>

      <div style={{display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:8, marginBottom:28}}>
        {[['Peak Months',ins.peakMonths],['Water Temp',ins.waterTemp],['Hatch Time',ins.hatchTime],['Water Type',ins.waterType]].map(([k,v]) => (
          <div key={k} style={{background:'white', borderRadius:10, padding:'12px 14px', border:'1px solid rgba(0,0,0,0.07)'}}>
            <div style={{fontSize:'0.6rem', letterSpacing:'0.12em', textTransform:'uppercase', color:C.stone, marginBottom:5, fontWeight:700}}>{k}</div>
            <div style={{fontSize:'0.82rem', fontWeight:600, color:C.forest}}>{v}</div>
          </div>
        ))}
      </div>

      <h3 style={{fontFamily:'Georgia,serif', fontSize:'1.05rem', marginBottom:14, color:C.forest}}>Life Stages and Imitations</h3>
      <div style={{display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:10, marginBottom:28}}>
        {ins.stages.map(s => {
          const photo = stagePhoto(s.fly);
          return (
            <div key={s.name} style={{background:'white', borderRadius:12, overflow:'hidden', border:'1px solid rgba(0,0,0,0.07)', boxShadow:'0 1px 4px rgba(0,0,0,0.05)'}}>
              <div style={{width:'100%', height:130, background:'#1a2e1a', position:'relative', overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center'}}>
                <ImgWithFallback src={photo} flyName={s.fly} style={{width:'100%', height:'100%', objectFit:'cover', transformOrigin:'center center'}}/>
                <div style={{position:'absolute', top:8, left:8, background:'rgba(0,0,0,0.62)', color:'white', fontSize:'0.58rem', fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', padding:'3px 8px', borderRadius:5}}>{s.name}</div>
              </div>
              <div style={{padding:'12px 13px'}}>
                <div style={{fontFamily:'Georgia,serif', fontSize:'0.88rem', fontWeight:600, marginBottom:3, color:C.forest}}>{s.fly}</div>
                <div style={{fontSize:'0.68rem', color:C.amber, fontWeight:600, marginBottom:6}}>Sizes: {s.sizes}</div>
                {s.waterLevel && <div style={{fontSize:'0.71rem', color:C.water, background:'#e8f0f8', borderRadius:5, padding:'4px 8px', marginBottom:7, fontWeight:500}}>{s.waterLevel}</div>}
                <div style={{fontSize:'0.76rem', color:'#555', lineHeight:1.55}}>{s.desc}</div>
                <div style={{display:'flex', gap:4, flexWrap:'wrap', marginTop:8}}>
                  {s.colors.map(c => (
                    <span key={c} style={{padding:'2px 7px', borderRadius:4, fontSize:'0.62rem', fontWeight:600, background:'rgba(0,0,0,0.04)', border:'1px solid rgba(0,0,0,0.09)'}}>{c}</span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <h3 style={{fontFamily:'Georgia,serif', fontSize:'1.05rem', marginBottom:14, color:C.forest}}>Top Fly Patterns</h3>
      <div style={{display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:10}}>
        {ins.topFlies.map(f => (
          <div key={f.name} style={{background:'white', borderRadius:12, overflow:'hidden', border:'1px solid rgba(0,0,0,0.07)', boxShadow:'0 1px 4px rgba(0,0,0,0.05)'}}>
            <div style={{width:'100%', height:140, background:'#1a2e1a', overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center'}}>
              <ImgWithFallback src={f.photo} flyName={f.name} style={{width:'100%', height:'100%', objectFit:'cover', transformOrigin:'center'}}/>
            </div>
            <div style={{padding:'12px 14px'}}>
              <div style={{fontSize:'0.68rem', fontWeight:700, marginBottom:5, color: f.confidence==='High' ? '#4a9a4a' : C.amber}}>{f.confidence==='High' ? 'High confidence' : 'Med confidence'}</div>
              <div style={{fontFamily:'Georgia,serif', fontSize:'0.92rem', marginBottom:2, color:C.forest}}>{f.name}</div>
              <div style={{fontSize:'0.7rem', color:C.stone, marginBottom:9}}>{f.style}</div>
              <div style={{display:'flex', justifyContent:'space-between', fontSize:'0.75rem', marginBottom:3}}><span style={{color:C.stone}}>Sizes</span><span style={{fontWeight:600}}>{f.sizes}</span></div>
              <div style={{display:'flex', justifyContent:'space-between', fontSize:'0.75rem', marginBottom:3}}><span style={{color:C.stone}}>Hook</span><span style={{fontWeight:600}}>{f.hook}</span></div>
              <div style={{display:'flex', justifyContent:'space-between', fontSize:'0.75rem', marginBottom:3}}><span style={{color:C.stone}}>Weight</span><span style={{fontWeight:600}}>{f.weight||'None'}</span></div>
              <div style={{fontSize:'0.76rem', color:C.sky, fontStyle:'italic', marginTop:9, lineHeight:1.45, borderTop:'1px solid rgba(0,0,0,0.06)', paddingTop:9}}>{f.tip}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ResultView({result:r, findPhoto, onNew, onView}) {
  const [expandedFly, setExpandedFly] = useState(null);
  const WATER_LEVELS = {
    'Nymph':   'Bottom — dead drift near riverbed',
    'Larva':   'Bottom — tumbling along riverbed',
    'Pupa':    'Mid-column to film — rising fast',
    'Emerger': 'Surface film — just below or in the meniscus',
    'Dun':     'Top water — floating on surface',
    'Adult':   'Top water — on or near surface',
    'Spinner': 'Top water — spent, flush in film',
  };
  const waterLevel = WATER_LEVELS[r.lifeStage] || null;

  if (!r.identified || r.notAnInsect) {
    return (
      <div style={{textAlign:'center', padding:'28px 0'}}>
        <div style={{fontFamily:'Georgia,serif', color:C.cream, fontSize:'1rem', marginBottom:8}}>Could not identify</div>
        <div style={{color:C.sage, fontSize:'0.84rem', marginBottom:20, lineHeight:1.6}}>{r.notAnInsectReason || 'Try a clearer, close-up photo in good light.'}</div>
        <button onClick={onNew} style={{padding:'10px 24px', background:C.amber, border:'none', color:'white', borderRadius:8, fontSize:'0.88rem', fontWeight:600, cursor:'pointer'}}>Try Again</button>
      </div>
    );
  }

  const dbMatch = DB.find(ins => ins.name.toLowerCase().includes((r.commonName||'').toLowerCase().split(' ').pop()) || ins.order === r.order);
  const photo = findPhoto(r.primaryFly);
  const confColor = r.confidence==='high' ? '#7bc97b' : r.confidence==='medium' ? C.amber : '#e08080';
  const confLabel = r.confidence==='high' ? 'High confidence' : r.confidence==='medium' ? 'Medium confidence' : 'Low confidence';

  return (
    <div>
      <div style={{background:'rgba(200,132,42,0.1)', border:'1px solid rgba(200,132,42,0.25)', borderRadius:12, padding:16, marginBottom:16}}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:8}}>
          <div>
            <div style={{fontFamily:'Georgia,serif', color:C.cream, fontSize:'1.2rem'}}>{r.commonName||'Unknown'}</div>
            <div style={{fontSize:'0.76rem', color:C.sage, fontStyle:'italic', marginTop:2}}>{r.latinName}</div>
          </div>
          <span style={{padding:'3px 10px', borderRadius:20, fontSize:'0.66rem', fontWeight:700, background: confColor + '22', color:confColor, border:'1px solid ' + confColor + '44', flexShrink:0}}>{confLabel}</span>
        </div>
        <div style={{fontSize:'0.72rem', color:C.stone}}>{((r.order||'unknown').charAt(0).toUpperCase()+(r.order||'unknown').slice(1))}</div>
      </div>

      <div style={{fontSize:'0.62rem', letterSpacing:'0.13em', textTransform:'uppercase', color:C.amber, fontWeight:700, marginBottom:8}}>Detected Life Stage</div>
      <div style={{background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:10, padding:'13px 14px', marginBottom:14}}>
        <div style={{fontSize:'0.68rem', textTransform:'uppercase', color:C.amber, marginBottom:8, fontWeight:700, letterSpacing:'0.08em'}}>{r.lifeStage}</div>
        {waterLevel && (
          <div style={{background:'rgba(91,154,191,0.12)', border:'1px solid rgba(91,154,191,0.25)', borderRadius:7, padding:'7px 11px', marginBottom:10, fontSize:'0.79rem', color:'#a8d4f0', fontWeight:500}}>{waterLevel}</div>
        )}
        <div style={{color:C.cream, fontSize:'0.88rem', marginBottom:5, lineHeight:1.4}}>{(r.stageDescription||'').split('.')[0]}</div>
        <div style={{color:C.sage, fontSize:'0.79rem', lineHeight:1.55}}>{r.stageDescription}</div>
      </div>

      <div style={{fontSize:'0.62rem', letterSpacing:'0.13em', textTransform:'uppercase', color:C.sky, fontWeight:700, marginBottom:8}}>Best Fly Right Now</div>
      <div style={{background:'rgba(91,154,191,0.08)', border:'1px solid rgba(91,154,191,0.25)', borderRadius:12, padding:14, marginBottom:14}}>
        <ImgWithFallback src={photo} flyName={r.primaryFly} style={{width:'100%', height:170, objectFit:'cover', borderRadius:9, marginBottom:12, display:'block'}} fallbackText="No photo available"/>
        <div style={{color:C.cream, fontSize:'1rem', fontFamily:'Georgia,serif', marginBottom:5}}>{r.primaryFly}</div>
        <div style={{fontSize:'0.73rem', color:C.sage, marginBottom:10}}>
          <span style={{color:C.cream, fontWeight:600}}>Style:</span> {r.primaryFlyStyle}
          {'   '}
          <span style={{color:C.cream, fontWeight:600}}>Sizes:</span> {r.primaryFlySizes}
        </div>
        <div style={{fontSize:'0.8rem', color:C.sky, fontStyle:'italic', lineHeight:1.45, marginBottom: r.presentation ? 12 : 0}}>{r.primaryFlyTip}</div>
        {r.presentation && (
          <div>
            <div style={{height:1, background:'rgba(255,255,255,0.07)', margin:'12px 0'}}/>
            <div style={{fontSize:'0.62rem', textTransform:'uppercase', letterSpacing:'0.12em', color:C.sage, fontWeight:700, marginBottom:8}}>Presentation</div>
            {Object.entries(r.presentation).filter(([,v]) => v).map(([k,v]) => (
              <div key={k} style={{display:'flex', gap:10, marginBottom:6}}>
                <div style={{fontSize:'0.67rem', color:C.stone, textTransform:'uppercase', width:52, flexShrink:0, paddingTop:1}}>{k}</div>
                <div style={{fontSize:'0.79rem', color:C.cream, lineHeight:1.4}}>{v}</div>
              </div>
            ))}
          </div>
        )}
        {r.rigging && (
          <div>
            <div style={{height:1, background:'rgba(255,255,255,0.07)', margin:'12px 0'}}/>
            <div style={{fontSize:'0.62rem', textTransform:'uppercase', letterSpacing:'0.12em', color:C.sage, fontWeight:700, marginBottom:8}}>Rigging</div>
            {Object.entries(r.rigging).filter(([,v]) => v).map(([k,v]) => (
              <div key={k} style={{display:'flex', gap:10, marginBottom:6}}>
                <div style={{fontSize:'0.67rem', color:C.stone, textTransform:'uppercase', width:52, flexShrink:0, paddingTop:1}}>{k}</div>
                <div style={{fontSize:'0.79rem', color:C.cream, lineHeight:1.4}}>{v}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {r.alternateFlies && r.alternateFlies.length > 0 && (
        <div>
          <div style={{fontSize:'0.62rem', letterSpacing:'0.13em', textTransform:'uppercase', color:C.amber, fontWeight:700, marginBottom:8}}>Also Try</div>
          {r.alternateFlies.map(f => {
            const altPhoto = findPhoto(f.name);
            const isOpen = expandedFly === f.name;
            const dbFly = (() => { for (const ins of DB) for (const tf of ins.topFlies) if (tf.name.toLowerCase() === f.name.toLowerCase()) return tf; return null; })();
            return (
              <div key={f.name} style={{background:'rgba(255,255,255,0.04)', border: '1px solid ' + (isOpen ? 'rgba(91,154,191,0.35)' : 'rgba(255,255,255,0.07)'), borderRadius:10, marginBottom:8, overflow:'hidden'}}>
                <div onClick={() => setExpandedFly(isOpen ? null : f.name)} style={{display:'flex', alignItems:'center', gap:12, padding:'11px 13px', cursor:'pointer'}}>
                  <div style={{width:44, height:44, borderRadius:8, background:'rgba(255,255,255,0.06)', overflow:'hidden', flexShrink:0}}>
                    <ImgWithFallback src={altPhoto} style={{width:'100%', height:'100%', objectFit:'cover'}} fallbackText="—"/>
                  </div>
                  <div style={{flex:1, minWidth:0}}>
                    <div style={{color:C.cream, fontSize:'0.88rem', fontWeight:600}}>{f.name}</div>
                    <div style={{fontSize:'0.7rem', color:C.stone, marginTop:2}}>{f.style} · sizes {f.sizes}</div>
                  </div>
                  <div style={{transform: isOpen ? 'rotate(180deg)' : 'none', transition:'transform 0.2s'}}>
                    <ChevronDown size={14} color={C.stone}/>
                  </div>
                </div>
                {isOpen && (
                  <div style={{padding:'0 13px 14px'}}>
                    {altPhoto && <ImgWithFallback src={altPhoto} style={{width:'100%', height:140, objectFit:'cover', borderRadius:8, marginBottom:12, display:'block'}}/>}
                    {dbFly ? (
                      <div>
                        <div style={{display:'flex', justifyContent:'space-between', fontSize:'0.76rem', marginBottom:5}}><span style={{color:C.stone}}>Hook</span><span style={{color:C.cream, fontWeight:600}}>{dbFly.hook}</span></div>
                        <div style={{display:'flex', justifyContent:'space-between', fontSize:'0.76rem', marginBottom:5}}><span style={{color:C.stone}}>Weight</span><span style={{color:C.cream, fontWeight:600}}>{dbFly.weight||'None'}</span></div>
                        <div style={{display:'flex', justifyContent:'space-between', fontSize:'0.76rem', marginBottom:10}}><span style={{color:C.stone}}>Confidence</span><span style={{color: dbFly.confidence==='High' ? '#7bc97b' : C.amber, fontWeight:600}}>{dbFly.confidence}</span></div>
                        <div style={{fontSize:'0.79rem', color:C.sky, fontStyle:'italic', lineHeight:1.45}}>{dbFly.tip}</div>
                      </div>
                    ) : (
                      <div style={{fontSize:'0.79rem', color:C.sage, lineHeight:1.5}}>A solid alternative when fish are being selective. Try sizes {f.sizes}.</div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {r.fishingNotes && (
        <div style={{background:'rgba(255,255,255,0.03)', borderRadius:10, padding:'12px 14px', marginBottom:14, marginTop:4, border:'1px solid rgba(255,255,255,0.06)'}}>
          <div style={{fontSize:'0.62rem', letterSpacing:'0.12em', textTransform:'uppercase', color:C.sage, marginBottom:6, fontWeight:700}}>On The Water</div>
          <p style={{color:C.cream, fontSize:'0.81rem', lineHeight:1.55, margin:0}}>{r.fishingNotes}</p>
        </div>
      )}

      <div style={{display:'flex', gap:10, marginTop:6}}>
        <button onClick={onNew} style={{padding:'12px 16px', background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.12)', color:C.cream, borderRadius:10, fontSize:'0.84rem', fontWeight:600, cursor:'pointer'}}>New Photo</button>
        {dbMatch && <button onClick={() => onView(dbMatch.id)} style={{flex:1, padding:'12px 16px', background:C.moss, border:'1px solid rgba(255,255,255,0.12)', color:C.cream, borderRadius:10, fontSize:'0.84rem', fontWeight:600, cursor:'pointer'}}>View Full Hatch Profile</button>}
      </div>
    </div>
  );
}
