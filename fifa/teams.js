/* ============================================================
   Kick-Off Roulette – Datenbank
   Format Verein : Name;KURZ;Primaerfarbe;Sekundaerfarbe;Sterne[;Muster]
   Format Land   : Name;KURZ;Flagge;Primaerfarbe;Sekundaerfarbe;Sterne
   Muster: plain | stripes | halves | sash | hoops
   ============================================================ */

const CLUB_LEAGUES = [
  { key: 'eng1', name: 'Premier League', country: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', teams: [
    'Manchester City;MCI;#6CABDD;#1C2C5B;5',
    'Liverpool;LIV;#C8102E;#F6EB61;5',
    'Arsenal;ARS;#EF0107;#FFFFFF;4.5',
    'Manchester United;MUN;#DA291C;#FBE122;4.5',
    'Chelsea;CHE;#034694;#FFFFFF;4.5',
    'Tottenham Hotspur;TOT;#132257;#FFFFFF;4.5',
    'Newcastle United;NEW;#241F20;#FFFFFF;4;stripes',
    'Aston Villa;AVL;#95BFE5;#670E36;4',
    'West Ham United;WHU;#7A263A;#1BB1E7;4',
    'Brighton & Hove Albion;BHA;#0057B8;#FFFFFF;4;stripes',
    'Crystal Palace;CRY;#1B458F;#C4122E;3.5;stripes',
    'Everton;EVE;#003399;#FFFFFF;3.5',
    'Wolverhampton Wanderers;WOL;#FDB913;#231F20;3.5',
    'Brentford;BRE;#D20000;#FFFFFF;3.5;stripes',
    'Fulham;FUL;#FFFFFF;#000000;3.5',
    'Nottingham Forest;NFO;#DD0000;#FFFFFF;3.5',
    'AFC Bournemouth;BOU;#DA291C;#000000;3.5;stripes',
    'Burnley;BUR;#6C1D45;#99D6EA;3',
    'Sheffield United;SHU;#EE2737;#000000;3;stripes',
    'Luton Town;LUT;#F78F1E;#002D62;3'
  ]},

  { key: 'ger1', name: 'Bundesliga', country: 'Deutschland', flag: '🇩🇪', teams: [
    'FC Bayern München;FCB;#DC052D;#FFFFFF;5',
    'Borussia Dortmund;BVB;#FDE100;#000000;4.5',
    'RB Leipzig;RBL;#DD0741;#FFFFFF;4.5',
    'Bayer 04 Leverkusen;B04;#E32219;#000000;4.5',
    'Eintracht Frankfurt;SGE;#E1000F;#000000;4',
    '1. FC Union Berlin;FCU;#EB1923;#FFEE00;4',
    'SC Freiburg;SCF;#000000;#E2001A;4',
    'VfL Wolfsburg;WOB;#65B32E;#FFFFFF;4',
    'VfB Stuttgart;VFB;#FFFFFF;#E32219;3.5',
    'Borussia Mönchengladbach;BMG;#000000;#00A651;3.5',
    'TSG 1899 Hoffenheim;TSG;#1961B5;#FFFFFF;3.5',
    '1. FSV Mainz 05;M05;#C3141E;#FFFFFF;3.5',
    '1. FC Köln;KOE;#FFFFFF;#E32219;3.5',
    'SV Werder Bremen;SVW;#1D9053;#FFFFFF;3.5',
    'FC Augsburg;FCA;#BA3733;#FFFFFF;3.5',
    'VfL Bochum;BOC;#005CA9;#FFFFFF;3',
    '1. FC Heidenheim;FCH;#E30613;#0033A0;3',
    'SV Darmstadt 98;SVD;#0B5EA8;#FFFFFF;3'
  ]},

  { key: 'esp1', name: 'LaLiga', country: 'Spanien', flag: '🇪🇸', teams: [
    'Real Madrid;RMA;#FEBE10;#FFFFFF;5',
    'FC Barcelona;FCB;#A50044;#004D98;5;stripes',
    'Atlético Madrid;ATM;#CB3524;#FFFFFF;4.5;stripes',
    'Sevilla FC;SEV;#FFFFFF;#D81920;4.5',
    'Real Sociedad;RSO;#0067B1;#FFFFFF;4;stripes',
    'Villarreal CF;VIL;#FFE667;#005187;4',
    'Real Betis;BET;#00954C;#FFFFFF;4;stripes',
    'Athletic Club;ATH;#EE2523;#FFFFFF;4;stripes',
    'Valencia CF;VAL;#FFFFFF;#F18E00;4',
    'CA Osasuna;OSA;#D91A21;#0A346F;3.5',
    'Girona FC;GIR;#CD2534;#FFFFFF;3.5;stripes',
    'Rayo Vallecano;RAY;#FFFFFF;#E53027;3.5;sash',
    'Celta de Vigo;CEL;#8AC3EE;#FFFFFF;3.5',
    'RCD Mallorca;MLL;#E20613;#000000;3.5',
    'Getafe CF;GET;#005999;#FFFFFF;3.5',
    'Deportivo Alavés;ALA;#0761AF;#FFFFFF;3;stripes',
    'Cádiz CF;CAD;#FFE500;#0057B8;3',
    'UD Almería;ALM;#CE1126;#FFFFFF;3;stripes',
    'Granada CF;GRA;#C4122E;#FFFFFF;3;stripes',
    'UD Las Palmas;LPA;#FFE400;#0067B2;3'
  ]},

  { key: 'ita1', name: 'Serie A', country: 'Italien', flag: '🇮🇹', teams: [
    'Inter Mailand;INT;#0068A8;#000000;4.5;stripes',
    'AC Mailand;MIL;#FB090B;#000000;4.5;stripes',
    'Juventus Turin;JUV;#FFFFFF;#000000;4.5;stripes',
    'SSC Neapel;NAP;#12A0D7;#FFFFFF;4.5',
    'AS Rom;ROM;#8E1F2F;#F0BC42;4.5',
    'Lazio Rom;LAZ;#87D8F7;#FFFFFF;4.5',
    'Atalanta Bergamo;ATA;#1D95D2;#000000;4;stripes',
    'AC Florenz;FIO;#582C83;#FFFFFF;4',
    'FC Bologna;BOL;#A21C24;#1A2F48;3.5;halves',
    'FC Turin;TOR;#881600;#FFFFFF;3.5',
    'AC Monza;MON;#E30613;#FFFFFF;3.5',
    'Udinese Calcio;UDI;#000000;#FFFFFF;3.5;stripes',
    'US Sassuolo;SAS;#00A752;#000000;3.5;stripes',
    'Genua CFC;GEN;#A21C24;#1A2F48;3.5;halves',
    'FC Empoli;EMP;#00579C;#FFFFFF;3',
    'US Salernitana;SAL;#7B1B26;#FFFFFF;3',
    'US Lecce;LEC;#FFE500;#E30613;3;halves',
    'Hellas Verona;VER;#FFE500;#12326F;3;halves',
    'Frosinone Calcio;FRO;#FFE500;#0055A5;3;halves',
    'Cagliari Calcio;CAG;#A6001E;#12326F;3;halves'
  ]},

  { key: 'fra1', name: 'Ligue 1', country: 'Frankreich', flag: '🇫🇷', teams: [
    'Paris Saint-Germain;PSG;#004170;#DA291C;5',
    'Olympique Marseille;OM;#2FAEE0;#FFFFFF;4.5',
    'AS Monaco;ASM;#E51B22;#FFFFFF;4;halves',
    'Olympique Lyon;OL;#FFFFFF;#DA291C;4',
    'LOSC Lille;LIL;#E01E13;#003DA5;4',
    'Stade Rennes;REN;#E23138;#000000;4;halves',
    'OGC Nizza;NIC;#DA291C;#000000;4;halves',
    'RC Lens;LEN;#FFE500;#DA291C;4;stripes',
    'Stade Reims;REI;#DA291C;#FFFFFF;3.5;stripes',
    'FC Nantes;NAN;#FFE500;#00A94F;3.5',
    'Montpellier HSC;MHSC;#F58220;#0055A4;3.5;halves',
    'RC Strasbourg;RCS;#009EE0;#FFFFFF;3.5',
    'FC Toulouse;TFC;#653A8B;#FFFFFF;3.5',
    'FC Lorient;FCL;#F58220;#000000;3.5',
    'Stade Brest;BRE;#E30613;#FFFFFF;3',
    'Le Havre AC;HAC;#0A2F6B;#87CEEB;3;stripes',
    'FC Metz;MET;#7B1B26;#FFFFFF;3',
    'Clermont Foot;CLE;#E30613;#0055A4;3;stripes'
  ]},

  { key: 'ned1', name: 'Eredivisie', country: 'Niederlande', flag: '🇳🇱', teams: [
    'Ajax Amsterdam;AJA;#FFFFFF;#D2122E;4;sash',
    'PSV Eindhoven;PSV;#EE1C25;#FFFFFF;4;stripes',
    'Feyenoord Rotterdam;FEY;#FFFFFF;#E30613;4;halves',
    'AZ Alkmaar;AZ;#E30613;#FFFFFF;3.5',
    'FC Twente;TWE;#E30613;#FFFFFF;3.5',
    'FC Utrecht;UTR;#E30613;#FFFFFF;3.5',
    'Vitesse Arnheim;VIT;#FFE500;#000000;3',
    'Sparta Rotterdam;SPA;#E30613;#FFFFFF;3;stripes'
  ]},

  { key: 'por1', name: 'Liga Portugal', country: 'Portugal', flag: '🇵🇹', teams: [
    'Benfica Lissabon;BEN;#E30613;#FFFFFF;4.5',
    'FC Porto;POR;#0055A4;#FFFFFF;4.5;stripes',
    'Sporting Lissabon;SCP;#008057;#FFFFFF;4.5;hoops',
    'SC Braga;BRA;#E30613;#FFFFFF;4',
    'Vitória Guimarães;VSC;#FFFFFF;#000000;3.5',
    'Boavista Porto;BOA;#000000;#FFFFFF;3;stripes'
  ]},

  { key: 'tur1', name: 'Süper Lig', country: 'Türkei', flag: '🇹🇷', teams: [
    'Galatasaray;GAL;#A90432;#FBB03B;4;halves',
    'Fenerbahçe;FEN;#FFED00;#003A70;4;stripes',
    'Beşiktaş;BJK;#000000;#FFFFFF;4;stripes',
    'Trabzonspor;TRA;#5D1A2C;#7EC8E3;3.5',
    'İstanbul Başakşehir;IBFK;#F58220;#182E5A;3.5'
  ]},

  { key: 'sau1', name: 'Saudi Pro League', country: 'Saudi-Arabien', flag: '🇸🇦', teams: [
    'Al Hilal;HIL;#0B3EA8;#FFFFFF;4',
    'Al Nassr;NAS;#FFE500;#0B4DA2;4;halves',
    'Al Ittihad;ITT;#000000;#FFE500;4;stripes',
    'Al Ahli;AHL;#009B48;#FFFFFF;4',
    'Al Ettifaq;ETT;#00843D;#FFFFFF;3.5'
  ]},

  { key: 'sco1', name: 'Scottish Premiership', country: 'Schottland', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', teams: [
    'Celtic Glasgow;CEL;#018749;#FFFFFF;4;hoops',
    'Glasgow Rangers;RAN;#1B458F;#FFFFFF;4',
    'Heart of Midlothian;HEA;#7B1B26;#FFFFFF;3',
    'FC Aberdeen;ABE;#E30613;#FFFFFF;3'
  ]},

  { key: 'bel1', name: 'Pro League', country: 'Belgien', flag: '🇧🇪', teams: [
    'Club Brügge;CLU;#0055A4;#000000;3.5;stripes',
    'RSC Anderlecht;AND;#4B2E83;#FFFFFF;3.5',
    'KRC Genk;GNK;#0055A4;#FFFFFF;3.5',
    'Royal Antwerpen;ANT;#E30613;#FFFFFF;3.5'
  ]},

  { key: 'atch', name: 'Österreich & Schweiz', country: 'Österreich / Schweiz', flag: '🇦🇹', teams: [
    'FC Red Bull Salzburg;RBS;#E30613;#FFFFFF;4',
    'SK Sturm Graz;STU;#000000;#FFFFFF;3.5',
    'SK Rapid Wien;RAP;#008057;#FFFFFF;3',
    'BSC Young Boys;YB;#FFE500;#000000;3.5;halves',
    'FC Basel;BAS;#E30613;#0055A4;3.5;halves',
    'FC Zürich;FCZ;#FFFFFF;#0055A4;3'
  ]},

  { key: 'nor1', name: 'Skandinavien', country: 'Nordeuropa', flag: '🇩🇰', teams: [
    'FC Kopenhagen;FCK;#FFFFFF;#0055A4;3.5;halves',
    'FC Midtjylland;FCM;#000000;#E30613;3.5;stripes',
    'Malmö FF;MFF;#87CEEB;#FFFFFF;3.5',
    'Rosenborg BK;RBK;#FFFFFF;#000000;3',
    'Molde FK;MOL;#0055A4;#FFFFFF;3',
    'HJK Helsinki;HJK;#0055A4;#FFFFFF;3'
  ]},

  { key: 'bra1', name: 'Brasileirão', country: 'Brasilien', flag: '🇧🇷', teams: [
    'Flamengo;FLA;#E30613;#000000;4;hoops',
    'Palmeiras;PAL;#006437;#FFFFFF;4',
    'Fluminense;FLU;#7A1737;#008057;4;stripes',
    'Corinthians;COR;#FFFFFF;#000000;3.5',
    'São Paulo FC;SAO;#FFFFFF;#E30613;3.5;hoops',
    'Grêmio;GRE;#0D80BF;#000000;3.5;stripes',
    'Internacional;INT;#E30613;#FFFFFF;3.5',
    'Atlético Mineiro;CAM;#000000;#FFFFFF;3.5;stripes',
    'Santos FC;SAN;#FFFFFF;#000000;3.5',
    'Botafogo;BOT;#000000;#FFFFFF;3.5;stripes'
  ]},

  { key: 'arg1', name: 'Liga Argentina', country: 'Argentinien', flag: '🇦🇷', teams: [
    'Boca Juniors;BOC;#0A2F6B;#FFE500;4;hoops',
    'River Plate;RIV;#FFFFFF;#E30613;4;sash',
    'Racing Club;RAC;#87CEEB;#FFFFFF;3.5;stripes',
    'Independiente;IND;#E30613;#FFFFFF;3.5',
    'San Lorenzo;SLO;#0A2F6B;#E30613;3.5;stripes',
    'Vélez Sarsfield;VEL;#FFFFFF;#0A2F6B;3.5;sash'
  ]},

  { key: 'mex1', name: 'Liga MX', country: 'Mexiko', flag: '🇲🇽', teams: [
    'Tigres UANL;TIG;#FFE500;#0A2F6B;4;stripes',
    'CF Monterrey;MTY;#0A2F6B;#FFFFFF;4;stripes',
    'Club América;AME;#FFE500;#0A2F6B;3.5',
    'Chivas Guadalajara;CHI;#E30613;#FFFFFF;3.5;stripes',
    'Cruz Azul;CAZ;#0A2F6B;#FFFFFF;3.5',
    'Pumas UNAM;PUM;#0A2F6B;#FFE500;3.5'
  ]},

  { key: 'usa1', name: 'Major League Soccer', country: 'USA & Kanada', flag: '🇺🇸', teams: [
    'Inter Miami CF;MIA;#F7B5CD;#000000;3.5',
    'Los Angeles FC;LFC;#000000;#C39E6D;3.5',
    'LA Galaxy;LAG;#FFFFFF;#0A2F6B;3.5',
    'Atlanta United;ATL;#8E1F2F;#000000;3.5;stripes',
    'Seattle Sounders;SEA;#5D9741;#0A2F6B;3.5',
    'New York Red Bulls;NYR;#E30613;#FFE500;3.5'
  ]},

  { key: 'ger2', name: '2. Bundesliga', country: 'Deutschland', flag: '🇩🇪', teams: [
    'Hamburger SV;HSV;#0055A4;#000000;3.5',
    'FC St. Pauli;STP;#67271A;#FFFFFF;3.5',
    'FC Schalke 04;S04;#0055A4;#FFFFFF;3.5',
    'Hertha BSC;BSC;#0055A4;#FFFFFF;3.5',
    'Fortuna Düsseldorf;F95;#E30613;#FFFFFF;3',
    'Hannover 96;H96;#008057;#FFFFFF;3',
    '1. FC Nürnberg;FCN;#8E1F2F;#FFFFFF;3',
    'Karlsruher SC;KSC;#0055A4;#FFFFFF;3'
  ]},

  { key: 'eng2', name: 'EFL Championship', country: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', teams: [
    'Leicester City;LEI;#003090;#FFFFFF;4',
    'Leeds United;LEE;#FFFFFF;#1D428A;4',
    'FC Southampton;SOU;#D71920;#FFFFFF;3.5;stripes',
    'Ipswich Town;IPS;#0A2F6B;#FFFFFF;3.5',
    'Norwich City;NOR;#FFF200;#00A650;3.5',
    'West Bromwich Albion;WBA;#122F67;#FFFFFF;3.5;stripes',
    'AFC Sunderland;SUN;#E30613;#FFFFFF;3.5;stripes',
    'FC Middlesbrough;MID;#E30613;#FFFFFF;3.5'
  ]}
];

const NATION_GROUPS = [
  { key: 'uefa', name: 'Europa (UEFA)', flag: '🇪🇺', teams: [
    'Frankreich;FRA;🇫🇷;#1D3A8A;#FFFFFF;5',
    'England;ENG;🏴󠁧󠁢󠁥󠁮󠁧󠁿;#FFFFFF;#CE1124;5',
    'Spanien;ESP;🇪🇸;#C60B1E;#FFC400;5',
    'Portugal;POR;🇵🇹;#046A38;#DA291C;5',
    'Deutschland;GER;🇩🇪;#000000;#FFFFFF;4.5',
    'Belgien;BEL;🇧🇪;#E30613;#FFE500;4.5',
    'Niederlande;NED;🇳🇱;#F36C21;#FFFFFF;4.5',
    'Italien;ITA;🇮🇹;#1D3A8A;#FFFFFF;4.5',
    'Kroatien;CRO;🇭🇷;#FFFFFF;#E30613;4.5',
    'Dänemark;DEN;🇩🇰;#C8102E;#FFFFFF;4',
    'Schweiz;SUI;🇨🇭;#DA291C;#FFFFFF;4',
    'Österreich;AUT;🇦🇹;#ED2939;#FFFFFF;4',
    'Polen;POL;🇵🇱;#FFFFFF;#DC143C;4',
    'Schweden;SWE;🇸🇪;#FECC00;#005293;4',
    'Serbien;SRB;🇷🇸;#C6363C;#FFFFFF;4',
    'Ukraine;UKR;🇺🇦;#FFD500;#0057B7;4',
    'Türkei;TUR;🇹🇷;#E30A17;#FFFFFF;4',
    'Wales;WAL;🏴󠁧󠁢󠁷󠁬󠁳󠁿;#C8102E;#00B140;4',
    'Tschechien;CZE;🇨🇿;#D7141A;#FFFFFF;3.5',
    'Schottland;SCO;🏴󠁧󠁢󠁳󠁣󠁴󠁿;#0065BF;#FFFFFF;3.5',
    'Norwegen;NOR;🇳🇴;#BA0C2F;#FFFFFF;3.5',
    'Ungarn;HUN;🇭🇺;#CE2939;#FFFFFF;3.5',
    'Griechenland;GRE;🇬🇷;#0D5EAF;#FFFFFF;3.5',
    'Irland;IRL;🇮🇪;#169B62;#FFFFFF;3.5',
    'Slowakei;SVK;🇸🇰;#0B4EA2;#FFFFFF;3.5',
    'Rumänien;ROU;🇷🇴;#FCD116;#002B7F;3.5',
    'Slowenien;SVN;🇸🇮;#FFFFFF;#005DA4;3.5',
    'Island;ISL;🇮🇸;#02529C;#FFFFFF;3',
    'Nordirland;NIR;🇬🇧;#00843D;#FFFFFF;3',
    'Finnland;FIN;🇫🇮;#FFFFFF;#003580;3'
  ]},

  { key: 'conmebol', name: 'Südamerika (CONMEBOL)', flag: '🌎', teams: [
    'Brasilien;BRA;🇧🇷;#FEDF00;#009C3B;5',
    'Argentinien;ARG;🇦🇷;#75AADB;#FFFFFF;5',
    'Uruguay;URU;🇺🇾;#7EB1DE;#FFFFFF;4.5',
    'Kolumbien;COL;🇨🇴;#FCD116;#003893;4.5',
    'Chile;CHI;🇨🇱;#D52B1E;#0039A6;4',
    'Ecuador;ECU;🇪🇨;#FFD100;#0033A0;4',
    'Peru;PER;🇵🇪;#FFFFFF;#D91023;3.5',
    'Paraguay;PAR;🇵🇾;#D52B1E;#0038A8;3.5',
    'Venezuela;VEN;🇻🇪;#8B1A1A;#FFFFFF;3.5',
    'Bolivien;BOL;🇧🇴;#007934;#FFFFFF;3'
  ]},

  { key: 'concacaf', name: 'Nord- & Mittelamerika (CONCACAF)', flag: '🌍', teams: [
    'Mexiko;MEX;🇲🇽;#006847;#FFFFFF;4',
    'USA;USA;🇺🇸;#FFFFFF;#B22234;4',
    'Kanada;CAN;🇨🇦;#D80621;#FFFFFF;4',
    'Costa Rica;CRC;🇨🇷;#CE1126;#002B7F;3.5',
    'Jamaika;JAM;🇯🇲;#FED100;#000000;3.5',
    'Panama;PAN;🇵🇦;#DA121A;#005293;3',
    'Honduras;HON;🇭🇳;#FFFFFF;#0073CF;3'
  ]},

  { key: 'afc', name: 'Asien & Ozeanien (AFC)', flag: '🌏', teams: [
    'Japan;JPN;🇯🇵;#1C3F94;#FFFFFF;4',
    'Südkorea;KOR;🇰🇷;#E30613;#003478;4',
    'Australien;AUS;🇦🇺;#FFCD00;#00843D;4',
    'Iran;IRN;🇮🇷;#FFFFFF;#239F40;3.5',
    'Saudi-Arabien;KSA;🇸🇦;#006C35;#FFFFFF;3.5',
    'Katar;QAT;🇶🇦;#8A1538;#FFFFFF;3.5',
    'Irak;IRQ;🇮🇶;#FFFFFF;#007A3D;3',
    'VAE;UAE;🇦🇪;#FFFFFF;#00732F;3',
    'Usbekistan;UZB;🇺🇿;#0099B5;#FFFFFF;3',
    'China;CHN;🇨🇳;#DE2910;#FFDE00;3'
  ]},

  { key: 'caf', name: 'Afrika (CAF)', flag: '🌍', teams: [
    'Marokko;MAR;🇲🇦;#C1272D;#006233;4.5',
    'Senegal;SEN;🇸🇳;#FFFFFF;#00853F;4',
    'Nigeria;NGA;🇳🇬;#008751;#FFFFFF;4',
    'Ägypten;EGY;🇪🇬;#C8102E;#FFFFFF;4',
    'Algerien;ALG;🇩🇿;#FFFFFF;#006233;4',
    'Elfenbeinküste;CIV;🇨🇮;#F77F00;#FFFFFF;4',
    'Tunesien;TUN;🇹🇳;#E70013;#FFFFFF;3.5',
    'Kamerun;CMR;🇨🇲;#007A5E;#CE1126;3.5',
    'Ghana;GHA;🇬🇭;#FFFFFF;#CE1126;3.5',
    'Mali;MLI;🇲🇱;#14B53A;#FCD116;3.5',
    'DR Kongo;COD;🇨🇩;#007FFF;#F7D618;3',
    'Südafrika;RSA;🇿🇦;#007A4D;#FFB612;3'
  ]}
];

/* ---------- Parser ---------- */
function buildClubs() {
  const out = [];
  CLUB_LEAGUES.forEach(l => l.teams.forEach(row => {
    const [name, abbr, primary, secondary, stars, pattern] = row.split(';');
    out.push({
      kind: 'club', name, abbr, primary, secondary,
      stars: parseFloat(stars), pattern: pattern || 'plain',
      groupKey: l.key, groupName: l.name, country: l.country, flag: l.flag,
      id: 'c_' + l.key + '_' + abbr + '_' + name.length
    });
  }));
  return out;
}

function buildNations() {
  const out = [];
  NATION_GROUPS.forEach(g => g.teams.forEach(row => {
    const [name, abbr, flag, primary, secondary, stars] = row.split(';');
    out.push({
      kind: 'nation', name, abbr, flag, primary, secondary,
      stars: parseFloat(stars), pattern: 'plain',
      groupKey: g.key, groupName: g.name, country: name,
      id: 'n_' + g.key + '_' + abbr
    });
  }));
  return out;
}

const CLUBS = buildClubs();
const NATIONS = buildNations();
