/* Двуезични (БГ / EN) данни за картата "Великите географски открития".
   Всичко, което се показва в popup-ите, атрибутивната таблица, легендата и надписите,
   се редактира само тук. Маршрутите (геометрията) остават в layers/*.js. */
var XP = {};

/* ---------- Интерфейс ---------- */
XP.ui = {
  bg: {
    pageTitle: 'Великите географски открития',
    legendTitle: 'ЕКСПЕДИЦИИ НА:',
    legendNote: 'С цифрата 1 е отбелязана Нидерландия.',
    tableBtn: 'Атрибутивна таблица',
    tableTitle: 'Атрибутивна таблица – експедиции',
    close: 'Затвори',
    cols: { route: 'Маршрут', explorer: 'Изследовател', year: 'Година',
            country: 'Държава на тръгване', from: 'Пристанище на тръгване', discovery: 'Откритие' },
    popup: { year: 'Година', country: 'Държава на тръгване', from: 'Пристанище на тръгване', discovery: 'Откритие' },
    photoOf: 'Портрет на'
  },
  en: {
    pageTitle: 'The Age of Discovery',
    legendTitle: 'EXPEDITIONS OF:',
    legendNote: 'The number 1 marks the Netherlands.',
    tableBtn: 'Attribute table',
    tableTitle: 'Attribute table – expeditions',
    close: 'Close',
    cols: { route: 'Route', explorer: 'Explorer', year: 'Year',
            country: 'Departure country', from: 'Departure port', discovery: 'Discovery' },
    popup: { year: 'Year', country: 'Departure country', from: 'Departure port', discovery: 'Discovery' },
    photoOf: 'Portrait of'
  }
};

/* ---------- Слоеве с маршрути (редът е редът в легендата) ---------- */
XP.layers = [
  { id: 'pt', period: '1500', layer: 'lyr_E_2', color: '#eb2a7b', name: { bg: 'Португалия', en: 'Portugal' } },
  { id: 'es', period: '1500', layer: 'lyr__5',  color: '#f6931e', name: { bg: 'Испания',    en: 'Spain' } },
  { id: 'gb', period: '1500', layer: 'lyr__6',  color: '#ec1d25', name: { bg: 'Англия',     en: 'England' } },
  { id: 'fr', period: '1500', layer: 'lyr__3',  color: '#2e3190', name: { bg: 'Франция',    en: 'France' } },
  { id: 'nl', period: '1500', layer: 'lyr__4',  color: '#009345', name: { bg: 'Нидерландия', en: 'Netherlands' } }
];

/* ---------- Атрибути на експедициите (ключ = слой:id на обекта) ----------
   photo = име на файл в папка images/ (без разширение; .jpg/.jpeg/.png/.webp се пробват автоматично) */
XP.exp = {
  'lyr_E_2:1': { photo: 'dias',
    name: { bg: 'Бартоломеу Диаш', en: 'Bartolomeu Dias' },
    life: { bg: 'ок. 1450 – 1500', en: 'c. 1450 – 1500' },
    country: { bg: 'Португалия', en: 'Portugal' },
    from: { bg: 'Лисабон, Португалия', en: 'Lisbon, Portugal' },
    desc: {
      bg: 'Първият европеец, заобиколил най-южната точка на Африка – нос Добра надежда (наричан от него Бурен нос). Плаването показва, че от Атлантическия океан може да се стигне до Индийския, и отваря пътя към Индия.',
      en: 'The first European to round the southern tip of Africa, the Cape of Good Hope (which he called the Cape of Storms). His voyage showed that the Atlantic can be linked with the Indian Ocean and opened the way to India.' } },

  'lyr_E_2:2': { photo: 'da-gama',
    name: { bg: 'Васко да Гама', en: 'Vasco da Gama' },
    life: { bg: 'ок. 1460 – 1524', en: 'c. 1460 – 1524' },
    country: { bg: 'Португалия', en: 'Portugal' },
    from: { bg: 'Лисабон, Португалия', en: 'Lisbon, Portugal' },
    desc: {
      bg: 'Открива морския път от Европа до Индия около Африка. През 1498 г. достига Каликут на Малабарския бряг и осигурява на Португалия пряк достъп до търговията с подправки.',
      en: 'Discovered the sea route from Europe to India around Africa. In 1498 he reached Calicut on the Malabar coast, giving Portugal direct access to the spice trade.' } },

  'lyr__5:3': { photo: 'columbus',
    name: { bg: 'Христофор Колумб', en: 'Christopher Columbus' },
    life: { bg: '1451 – 1506', en: '1451 – 1506' },
    country: { bg: 'Испания', en: 'Spain' },
    from: { bg: 'Палос де ла Фронтера, Испания', en: 'Palos de la Frontera, Spain' },
    desc: {
      bg: 'Търси западен път към Индия и вместо това стига до Бахамските острови (о. Сан Салвадор, 12 октомври 1492 г.), Куба и Хаити. Започват постоянните контакти между Европа и Америка.',
      en: 'Seeking a western route to Asia, he instead reached the Bahamas (San Salvador, 12 October 1492), Cuba and Hispaniola. Lasting contact between Europe and the Americas begins.' } },

  'lyr__6:1': { photo: 'cabot',
    name: { bg: 'Джон Кабот', en: 'John Cabot' },
    life: { bg: 'ок. 1450 – ок. 1500', en: 'c. 1450 – c. 1500' },
    country: { bg: 'Англия', en: 'England' },
    from: { bg: 'Бристъл, Англия', en: 'Bristol, England' },
    desc: {
      bg: 'Италианец (Джовани Кабото) на английска служба. През 1497 г. достига бреговете на Северна Америка (района на Нюфаундленд и нос Бретон) – основание за по-късните английски претенции към региона.',
      en: 'An Italian (Giovanni Caboto) in English service. In 1497 he reached the coast of North America (the Newfoundland and Cape Breton area), the basis of later English claims in the region.' } },

  'lyr__5:4': { photo: 'columbus',
    name: { bg: 'Христофор Колумб', en: 'Christopher Columbus' },
    life: { bg: '1451 – 1506', en: '1451 – 1506' },
    country: { bg: 'Испания', en: 'Spain' },
    from: { bg: 'Кадис, Испания', en: 'Cádiz, Spain' },
    desc: {
      bg: 'Четвърто плаване: изследва бреговете на Централна Америка – от Хондурас през Никарагуа и Коста Рика до Панама – в търсене на проход към Индийския океан.',
      en: 'Fourth voyage: he explored the coast of Central America – from Honduras through Nicaragua and Costa Rica to Panama – looking for a passage to the Indian Ocean.' } },

  'lyr__5:1': { photo: 'magellan',
    name: { bg: 'Фернандо Магелан', en: 'Ferdinand Magellan' },
    life: { bg: 'ок. 1480 – 1521', en: 'c. 1480 – 1521' },
    country: { bg: 'Испания', en: 'Spain' },
    from: { bg: 'Санлукар де Баррамеда, Испания', en: 'Sanlúcar de Barrameda, Spain' },
    desc: {
      bg: 'Португалец на испанска служба. Открива пролива в южния край на Южна Америка (Магеланов проток, 1520 г.) и пресича Тихия океан. Загива във Филипините през 1521 г., но експедицията му извършва първото околосветско плаване.',
      en: 'A Portuguese navigator in Spanish service. He found the strait at the southern tip of South America (Strait of Magellan, 1520) and crossed the Pacific. He was killed in the Philippines in 1521, but his expedition completed the first circumnavigation of the globe.' } },

  'lyr__5:2': { photo: 'elcano',
    name: { bg: 'Хуан Себастиан де Елкано', en: 'Juan Sebastián Elcano' },
    life: { bg: '1486 – 1526', en: '1486 – 1526' },
    country: { bg: 'Испания', en: 'Spain' },
    from: { bg: 'Санлукар де Баррамеда, Испания (експедицията на Магелан)', en: 'Sanlúcar de Barrameda, Spain (Magellan’s expedition)' },
    desc: {
      bg: 'След смъртта на Магелан поема командването и през 1522 г. завършва първото околосветско плаване на кораба „Виктория“: през Индийския океан, около нос Добра надежда, обратно до Испания.',
      en: 'After Magellan’s death he took command and in 1522 completed the first circumnavigation of the globe aboard the Victoria: across the Indian Ocean, around the Cape of Good Hope and back to Spain.' } },

  'lyr__3:1': { photo: 'cartier',
    name: { bg: 'Жак Картие', en: 'Jacques Cartier' },
    life: { bg: '1491 – 1557', en: '1491 – 1557' },
    country: { bg: 'Франция', en: 'France' },
    from: { bg: 'Сен Мало, Франция', en: 'Saint-Malo, France' },
    desc: {
      bg: 'Изследва залива Свети Лаврентий и бреговете на Канада и обявява земите за френско владение (1534 г.) – началото на Нова Франция.',
      en: 'Explored the Gulf of St. Lawrence and the coast of Canada and claimed the land for France (1534) – the beginning of New France.' } },

  'lyr__4:1': { photo: 'tasman',
    name: { bg: 'Абел Тасман', en: 'Abel Tasman' },
    life: { bg: '1603 – 1659', en: '1603 – 1659' },
    country: { bg: 'Нидерландия', en: 'Netherlands' },
    from: { bg: 'Батавия, Холандска Ост-Индия (днес Джакарта)', en: 'Batavia, Dutch East Indies (now Jakarta)' },
    desc: {
      bg: 'На служба на Нидерландската Ост-Индийска компания открива Тасмания (Земята на Ван Димен) и Нова Зеландия през 1642 г. Плава около Австралия, без да види континента.',
      en: 'In the service of the Dutch East India Company he found Tasmania (Van Diemen’s Land) and New Zealand in 1642. He sailed around Australia without sighting the mainland.' } }
};

/* ---------- Столици (слой "Столици" – само надпис на картата, не е в легендата) ----------
   align: 'right' = надписът е вдясно от точката, 'left' = вляво от точката */
XP.capitals = {
  'Лисабон':        { en: 'Lisbon',         align: 'left' },
  'Палос':          { en: 'Palos',          align: 'right' },
  'Каликут':        { en: 'Calicut',        align: 'right' },
  'Момбаса':        { en: 'Mombasa',        align: 'left' },
  'Могадишу':       { bg: 'Могадишо', en: 'Mogadishu', align: 'left' },
  'Мека':           { en: 'Mecca',          align: 'right' },
  'Куско':          { en: 'Cuzco',          align: 'right' },
  'Кито':           { en: 'Quito',          align: 'right' },
  'Теночтитлан':    { en: 'Tenochtitlan',   align: 'right' },
  'Багдад':         { en: 'Baghdad',        align: 'right' },
  'Константинопол': { en: 'Constantinople', align: 'right' },
  'Делхи':          { en: 'Delhi',          align: 'left' },
  'Пекин':          { en: 'Beijing',        align: 'right' },
  'Москва':         { en: 'Moscow',         align: 'right' }
};

/* ---------- Надписи върху картата ----------
   t: ocean | continent | polity | place | num     ll: [дължина, ширина]
   sp: разреден шрифт   rot: наклон в градуси (по часовниковата стрелка) */
XP.labels = [
  // океани
  { t: 'ocean', sp: 1, bg: 'АТЛАНТИЧЕСКИ', en: 'ATLANTIC', ll: [-50, 37] },
  { t: 'ocean', sp: 1, bg: 'ОКЕАН', en: 'OCEAN', ll: [-46, 9] },
  { t: 'ocean', sp: 1, bg: 'ТИХИ ОКЕАН', en: 'PACIFIC OCEAN', ll: [-124, 0], rot: -90 },
  { t: 'ocean', sp: 1, bg: 'ТИХИ ОКЕАН', en: 'PACIFIC OCEAN', ll: [164, 15], rot: 90 },
  { t: 'ocean', sp: 1, bg: 'ИНДИЙСКИ\nОКЕАН', en: 'INDIAN\nOCEAN', ll: [84, -6] },
  // континенти
  { t: 'continent', sp: 1, bg: 'СЕВЕРНА\nАМЕРИКА', en: 'NORTH\nAMERICA', ll: [-108, 47] },
  { t: 'continent', sp: 1, bg: 'ЮЖНА\nАМЕРИКА', en: 'SOUTH\nAMERICA', ll: [-46, -13] },
  { t: 'continent', sp: 1, bg: 'АФРИКА', en: 'AFRICA', ll: [18, 6] },
  { t: 'continent', sp: 1, bg: 'АЗИЯ', en: 'ASIA', ll: [72, 52] },
  { t: 'continent', bg: 'АВСТРАЛИЯ', en: 'AUSTRALIA', ll: [134, -25] },
  { t: 'continent', bg: 'ИНДИЯ', en: 'INDIA', ll: [79, 19] },
  // държави и владения около 1500 г.
  { p: '1500', t: 'polity', bg: 'АНГЛИЯ', en: 'ENGLAND', ll: [-6.2, 53.4] },
  { p: '1500', t: 'polity', bg: 'ФРАНЦИЯ', en: 'FRANCE', ll: [2.4, 46.4] },
  { p: '1500', t: 'polity', bg: 'ПОРТУГАЛИЯ', en: 'PORTUGAL', ll: [-10.4, 41.6], al: 'right' },
  { p: '1500', t: 'polity', bg: 'ИСПАНИЯ', en: 'SPAIN', ll: [-3.7, 40.3] },
  { p: '1500', t: 'polity', sp: 1, bg: 'ДАНИЯ', en: 'DENMARK-NORWAY', ll: [9.5, 63.6], rot: -62 },
  { p: '1500', t: 'polity', bg: 'ШВЕЦИЯ', en: 'SWEDEN', ll: [16, 61.2] },
  { p: '1500', t: 'polity', sp: 1, bg: 'ПОЛША', en: 'POLAND', ll: [21, 52.2] },
  { p: '1500', t: 'polity', bg: 'МОСКОВСКО КНЯЖ.', en: 'GRAND DUCHY OF MOSCOW', ll: [46, 60.5], rot: -26 },
  { p: '1500', t: 'polity', bg: 'ОСМАНСКА\nДЪРЖАВА', en: 'OTTOMAN\nEMPIRE', ll: [23, 39.6], rot: 20 },
  { p: '1500', t: 'polity', bg: 'МАМЕЛЮКСКИ\nСУЛТАНАТ', en: 'MAMLUK\nSULTANATE', ll: [30.8, 24.5], rot: 62 },
  { p: '1500', t: 'polity', bg: 'ДЕЛХИЙСКИ\nСУЛТАНАТ', en: 'DELHI\nSULTANATE', ll: [81.5, 34.2], rot: -20 },
  { p: '1500', t: 'polity', sp: 1, bg: 'КИТАЙ', en: 'CHINA', ll: [112, 33] },
  { p: '1500', t: 'polity', bg: 'ЯПОНИЯ', en: 'JAPAN', ll: [148, 35], rot: -58 },
  { p: '1500', t: 'polity', bg: 'ИМПЕРИЯ\nНА АЦТЕКИТЕ', en: 'AZTEC\nEMPIRE', ll: [-101, 14] },
  { p: '1500', t: 'polity', bg: 'ИМПЕРИЯ\nНА ИНКИТЕ', en: 'INCA\nEMPIRE', ll: [-62, -4.5] },
  { p: '1500', t: 'num', bg: '1', en: '1', ll: [5.4, 52.2] },
  // острови, проливи, носове
  { t: 'place', bg: 'о-ви Нова земя', en: 'Novaya Zemlya', ll: [57, 74.5] },
  { t: 'place', bg: 'о. Гренландия', en: 'Greenland', ll: [-33, 61] },
  { t: 'place', bg: 'о. Сан Салвадор', en: 'San Salvador', ll: [-64, 23.3] },
  { t: 'place', bg: 'о. Цейлон', en: 'Ceylon', ll: [84.5, 5] },
  { t: 'place', bg: 'о. Мадагаскар', en: 'Madagascar', ll: [56, -14] },
  { t: 'place', bg: 'о. Тасмания', en: 'Tasmania', ll: [142, -47] },
  { t: 'place', bg: 'Нова Зеландия', en: 'New Zealand', ll: [172, -50] },
  { t: 'place', bg: 'Филипински о-ви', en: 'Philippines', ll: [146, 16] },
  { t: 'place', bg: 'Магеланов пр.', en: 'Strait of Magellan', ll: [-62, -57] },
  { t: 'place', bg: 'н. Добра надежда', en: 'Cape of Good Hope', ll: [4, -38.5] }
];


/* =====================================================================
   ПЕРИОДИ: ок. 1300 (Марко Поло, Рубрук), ок. 1500 (Великите открития), ок. 1783 (Кук)
   Политическите карти са от проекта historical-basemaps (aourednik, GPL-3.0). Маршрутите са приблизителни.
   ===================================================================== */
XP.periods = [
  { id: '1300', base: 1279, land: 'json_land_1279', pol: 'json_polities_1279', extent: [-12, -14, 138, 68],
    btn: { bg: 'ок. 1300', en: 'c. 1300' },
    name: { bg: 'Марко Поло и Рубрук – XIII в.', en: 'Marco Polo and Rubruck – 13th century' },
    note: { bg: 'Политическа карта към 1279 г. Маршрутите са приблизителни.', en: 'Political map c. 1279. Routes are approximate.' } },
  { id: '1500', base: 1500, land: 'json_land_bg', pol: 'json_polities', extent: [-133, -57, 187, 81],
    btn: { bg: 'ок. 1500', en: 'c. 1500' },
    name: { bg: 'Великите географски открития – XV–XVII в.', en: 'The Age of Discovery – 15th–17th century' },
    note: { bg: 'С цифрата 1 е отбелязана Нидерландия.', en: 'The number 1 marks the Netherlands.' } },
  { id: '1783', base: 1783, land: 'json_land_1783', pol: 'json_polities_1783', extent: [-25, -62, 215, 78],
    btn: { bg: 'ок. 1783', en: 'c. 1783' },
    name: { bg: 'Джеймс Кук – XVIII в.', en: 'James Cook – 18th century' },
    note: { bg: 'Политическа карта към 1783 г. Маршрутите са приблизителни.', en: 'Political map c. 1783. Routes are approximate.' } }
];

/* нови групи маршрути (GeoJSON: layers/routes_new.js, полета grp и id) */
XP.layers.push(
  { id: 've', period: '1300', grp: 've', color: '#8e24aa', name: { bg: 'Венеция', en: 'Venice' } },
  { id: 'fr13', period: '1300', grp: 'fr', color: '#2e3190', name: { bg: 'Франция', en: 'France' } },
  { id: 'gb18', period: '1783', grp: 'gb', color: '#ec1d25', name: { bg: 'Великобритания', en: 'Great Britain' } }
);

XP.exp['ve:1'] = { photo: 'polo',
  name: { bg: 'Марко Поло', en: 'Marco Polo' },
  life: { bg: 'ок. 1254 – 1324', en: 'c. 1254 – 1324' },
  country: { bg: 'Венеция', en: 'Venice' },
  from: { bg: 'Венеция', en: 'Venice' },
  desc: {
    bg: 'Венецианският търговец тръгва с баща си и чичо си към двора на монголския велик хан Хубилай. Пътят минава през Близкия изток, Персия, Памир и пустинята Такламакан до Ханбалък (днешен Пекин) – през 1275 г. Около 17 години остава на служба при хана.',
    en: 'The Venetian merchant sets out with his father and uncle for the court of the Mongol Great Khan Kublai. The road leads through the Middle East, Persia, the Pamirs and the Taklamakan Desert to Khanbaliq (today’s Beijing) – reached in 1275. He stays about 17 years in the Khan’s service.' } };
XP.exp['ve:2'] = { photo: 'polo',
  name: { bg: 'Марко Поло', en: 'Marco Polo' },
  life: { bg: 'ок. 1254 – 1324', en: 'c. 1254 – 1324' },
  country: { bg: 'Венеция', en: 'Venice' },
  from: { bg: 'Цюенчжоу, Китай', en: 'Quanzhou, China' },
  desc: {
    bg: 'Връща се по море: от Цюенчжоу през Южнокитайско море, Суматра, Цейлон и Индия до Ормуз, а оттам по суша през Персия до Трапезунд, Константинопол и Венеция (1295 г.). Книгата му „Описание на света“ разпалва интереса на европейците към Азия.',
    en: 'He returns by sea: from Quanzhou across the South China Sea, past Sumatra, Ceylon and India to Hormuz, then overland through Persia to Trebizond, Constantinople and Venice (1295). His book “The Description of the World” fired European interest in Asia.' } };

XP.exp['fr:1'] = { photo: 'rubruck',
  name: { bg: 'Вилхем Рубрук', en: 'William of Rubruck' },
  life: { bg: 'ок. 1220 – ок. 1293', en: 'c. 1220 – c. 1293' },
  country: { bg: 'Франция', en: 'France' },
  from: { bg: 'Константинопол', en: 'Constantinople' },
  desc: {
    bg: 'Фламандски францисканец, изпратен от френския крал Луи IX като пратеник при монголите. През 1253 г. тръгва от Константинопол, пресича Крим, Дон и Волга и през Централна Азия стига до Каракорум – столицата на великия хан Мьонгке.',
    en: 'A Flemish Franciscan sent by King Louis IX of France as an envoy to the Mongols. In 1253 he leaves Constantinople, crosses Crimea, the Don and the Volga, and reaches Karakorum, the capital of the Great Khan Möngke, across Central Asia.' } };
XP.exp['fr:2'] = { photo: 'rubruck',
  name: { bg: 'Вилхем Рубрук', en: 'William of Rubruck' },
  life: { bg: 'ок. 1220 – ок. 1293', en: 'c. 1220 – c. 1293' },
  country: { bg: 'Франция', en: 'France' },
  from: { bg: 'Каракорум, Монголска империя', en: 'Karakorum, Mongol Empire' },
  desc: {
    bg: 'Връща се през 1254–1255 г. през Волга и Кавказ до Триполи в Леванта. Подробният му доклад до краля описва монголите, бита и вярванията им и е един от най-ранните и най-точни европейски текстове за Централна Азия.',
    en: 'He returns in 1254–1255 via the Volga and the Caucasus to Tripoli in the Levant. His detailed report to the king describes the Mongols, their way of life and beliefs, and is one of the earliest and most accurate European accounts of Central Asia.' } };

XP.exp['gb:1'] = { photo: 'cook',
  name: { bg: 'Джеймс Кук', en: 'James Cook' },
  life: { bg: '1728 – 1779', en: '1728 – 1779' },
  country: { bg: 'Великобритания', en: 'Great Britain' },
  from: { bg: 'Плимут, Англия', en: 'Plymouth, England' },
  desc: {
    bg: 'Първо плаване (1768–1771): с кораба „Индевър“ наблюдава преминаването на Венера пред Слънцето при Таити (1769), картографира Нова Зеландия и открива източния бряг на Австралия (Ботани бей, 1770).',
    en: 'First voyage (1768–1771): aboard the Endeavour he observes the transit of Venus at Tahiti (1769), charts New Zealand and explores the east coast of Australia (Botany Bay, 1770).' } };
XP.exp['gb:2'] = { photo: 'cook',
  name: { bg: 'Джеймс Кук', en: 'James Cook' },
  life: { bg: '1728 – 1779', en: '1728 – 1779' },
  country: { bg: 'Великобритания', en: 'Great Britain' },
  from: { bg: 'Плимут, Англия', en: 'Plymouth, England' },
  desc: {
    bg: 'Второ плаване (1772–1775): търси хипотетичния Южен континент. Първият пресича Южния полярен кръг (1773) и стига до 71°10′ ю.ш., с което показва, че голям обитаем южен континент няма. Открива Нова Каледония и о. Южна Джорджия.',
    en: 'Second voyage (1772–1775): in search of the hypothetical Southern Continent. He is the first to cross the Antarctic Circle (1773) and reaches 71°10′ S, showing that no large habitable southern continent exists. He finds New Caledonia and South Georgia.' } };
XP.exp['gb:3'] = { photo: 'cook',
  name: { bg: 'Джеймс Кук', en: 'James Cook' },
  life: { bg: '1728 – 1779', en: '1728 – 1779' },
  country: { bg: 'Великобритания', en: 'Great Britain' },
  from: { bg: 'Плимут, Англия', en: 'Plymouth, England' },
  desc: {
    bg: 'Трето плаване (1776–1779): търси Северозападния проход от Тихия океан. Открива Хавайските острови (1778), изследва бреговете на Северна Америка до Беринговия проток. Загива на Хаваите през февруари 1779 г.',
    en: 'Third voyage (1776–1779): he searches for the Northwest Passage from the Pacific. He finds the Hawaiian Islands (1778) and explores the North American coast up to the Bering Strait. He is killed in Hawaii in February 1779.' } };

/* ---------- градове и пристанища за периодите (само точка + надпис) ---------- */
XP.places = {
  '1300': [
    { bg: 'Венеция', en: 'Venice', ll: [12.33, 45.44], align: 'left' },
    { bg: 'Акра', en: 'Acre', ll: [35.07, 32.92], align: 'right' },
    { bg: 'Ормуз', en: 'Hormuz', ll: [56.46, 27.12], align: 'right' },
    { bg: 'Кашгар', en: 'Kashgar', ll: [75.99, 39.47], align: 'right' },
    { bg: 'Ханбалък (Пекин)', en: 'Khanbaliq (Beijing)', ll: [116.4, 39.9], align: 'right' },
    { bg: 'Цюенчжоу', en: 'Quanzhou', ll: [118.67, 24.88], align: 'right' },
    { bg: 'Константинопол', en: 'Constantinople', ll: [28.98, 41.01], align: 'left' },
    { bg: 'Каракорум', en: 'Karakorum', ll: [102.8, 47.2], align: 'right' },
    { bg: 'Сарай', en: 'Sarai', ll: [46.5, 48.5], align: 'right' },
    { bg: 'Трапезунд', en: 'Trebizond', ll: [39.73, 41.0], align: 'right' },
    { bg: 'Тебриз', en: 'Tabriz', ll: [46.29, 38.08], align: 'right' },
    { bg: 'Триполи', en: 'Tripoli', ll: [35.85, 34.43], align: 'right' },
    { bg: 'Судак', en: 'Soldaia (Sudak)', ll: [34.97, 44.85], align: 'right' }
  ],
  '1783': [
    { bg: 'Плимут', en: 'Plymouth', ll: [-4.14, 50.37], align: 'left' },
    { bg: 'Таити', en: 'Tahiti', ll: [-149.5, -17.6], align: 'right' },
    { bg: 'Ботани бей', en: 'Botany Bay', ll: [151.2, -34.0], align: 'right' },
    { bg: 'Кеалакекуа (Хаваи)', en: 'Kealakekua Bay (Hawaii)', ll: [-155.9, 19.5], align: 'right' },
    { bg: 'Нутка', en: 'Nootka Sound', ll: [-126.6, 49.6], align: 'right' },
    { bg: 'Кейптаун', en: 'Cape Town', ll: [18.4, -33.9], align: 'left' },
    { bg: 'Батавия', en: 'Batavia', ll: [106.8, -6.2], align: 'right' },
    { bg: 'Рио де Жанейро', en: 'Rio de Janeiro', ll: [-43.2, -22.9], align: 'right' },
    { bg: 'Великденски о-в', en: 'Easter Island', ll: [-109.4, -27.1], align: 'right' }
  ]
};

/* ---------- надписи за новите периоди ---------- */
XP.labels.push(
  // ок. 1300
  { p: '1300', t: 'polity', bg: 'ВЕЛИКО ХАНСТВО\n(ЮАН)', en: 'GREAT KHANATE\n(YUAN)', ll: [110, 31.5] },
  { p: '1300', t: 'polity', bg: 'ЗЛАТНА ОРДА', en: 'GOLDEN HORDE', ll: [60, 54] },
  { p: '1300', t: 'polity', sp: 1, bg: 'ИЛХАНАТ', en: 'ILKHANATE', ll: [54, 33.5] },
  { p: '1300', t: 'polity', bg: 'ЧАГАТАЙСКО\nХАНСТВО', en: 'CHAGATAI\nKHANATE', ll: [84, 42.5] },
  { p: '1300', t: 'polity', bg: 'ДЕЛХИЙСКИ\nСУЛТАНАТ', en: 'DELHI\nSULTANATE', ll: [77, 26.5] },
  { p: '1300', t: 'polity', bg: 'МАМЕЛЮКСКИ\nСУЛТАНАТ', en: 'MAMLUK\nSULTANATE', ll: [30.8, 26.5], rot: 62 },
  { p: '1300', t: 'polity', bg: 'ВИЗАНТИЯ', en: 'BYZANTINE\nEMPIRE', ll: [22.5, 40.0] },
  { p: '1300', t: 'polity', bg: 'СЕЛДЖУКИ', en: 'SELJUKS', ll: [33.5, 38.6] },
  { p: '1300', t: 'polity', bg: 'СВЕЩЕНА\nРИМСКА ИМПЕРИЯ', en: 'HOLY ROMAN\nEMPIRE', ll: [10.5, 50.3] },
  { p: '1300', t: 'polity', bg: 'ФРАНЦИЯ', en: 'FRANCE', ll: [2.4, 46.8] },
  { p: '1300', t: 'polity', bg: 'УНГАРИЯ', en: 'HUNGARY', ll: [20, 47.3] },
  { p: '1300', t: 'polity', bg: 'ПОЛША', en: 'POLAND', ll: [19.5, 52.2] },
  { p: '1300', t: 'polity', bg: 'НОВГОРОД', en: 'NOVGOROD', ll: [38, 60.5] },
  { p: '1300', t: 'polity', bg: 'КАСТИЛИЯ', en: 'CASTILE', ll: [-4.2, 40.9] },
  { p: '1300', t: 'polity', sp: 1, bg: 'ТИБЕТ', en: 'TIBET', ll: [90, 32.5] },
  { p: '1300', t: 'polity', bg: 'ЯПОНИЯ', en: 'JAPAN', ll: [138, 38.6], rot: -58 },
  // ок. 1783
  { p: '1783', t: 'polity', sp: 1, bg: 'РУСКА ИМПЕРИЯ', en: 'RUSSIAN EMPIRE', ll: [62, 60] },
  { p: '1783', t: 'polity', sp: 1, bg: 'ЦИН', en: 'QING', ll: [108, 37] },
  { p: '1783', t: 'polity', bg: 'ОСМАНСКА\nИМПЕРИЯ', en: 'OTTOMAN\nEMPIRE', ll: [35, 38.2] },
  { p: '1783', t: 'polity', bg: 'ПЕРСИЯ', en: 'PERSIA', ll: [54, 32] },
  { p: '1783', t: 'polity', bg: 'САЩ', en: 'USA', ll: [-85, 37.5] },
  { p: '1783', t: 'polity', bg: 'НОВА ИСПАНИЯ', en: 'NEW SPAIN', ll: [-104, 25.5] },
  { p: '1783', t: 'polity', bg: 'ПЕРУ', en: 'PERU', ll: [-72, -11] },
  { p: '1783', t: 'polity', bg: 'БРАЗИЛИЯ', en: 'BRAZIL', ll: [-52, -10] },
  { p: '1783', t: 'polity', bg: 'НОВА\nГРАНАДА', en: 'NEW\nGRANADA', ll: [-72, 4.5] },
  { p: '1783', t: 'polity', bg: 'РИО ДЕ\nЛА ПЛАТА', en: 'RÍO DE\nLA PLATA', ll: [-62, -31] },
  { p: '1783', t: 'polity', bg: 'РУПЕРТСЛЕНД', en: 'RUPERT’S LAND', ll: [-100, 57] },
  { p: '1783', t: 'polity', bg: 'ЛУИЗИАНА', en: 'LOUISIANA', ll: [-100, 41] },
  { p: '1783', t: 'polity', bg: 'ФРАНЦИЯ', en: 'FRANCE', ll: [2.4, 46.6] },
  { p: '1783', t: 'polity', bg: 'ИСПАНИЯ', en: 'SPAIN', ll: [-3.6, 40.2] },
  { p: '1783', t: 'polity', bg: 'ВЕЛИКОБРИТАНИЯ', en: 'GREAT BRITAIN', ll: [-3.2, 54.8] },
  { p: '1783', t: 'polity', bg: 'ШВЕЦИЯ', en: 'SWEDEN', ll: [17, 62.2] },
  { p: '1783', t: 'polity', sp: 1, bg: 'ДАНИЯ-НОРВЕГИЯ', en: 'DENMARK-NORWAY', ll: [9, 63.6], rot: -62 },
  { p: '1783', t: 'polity', bg: 'АВСТРИЙСКА\nИМПЕРИЯ', en: 'AUSTRIAN\nEMPIRE', ll: [19, 47.6] },
  { p: '1783', t: 'polity', bg: 'ПРУСИЯ', en: 'PRUSSIA', ll: [15.5, 53] },
  { p: '1783', t: 'polity', bg: 'МАРАТХИ', en: 'MARATHAS', ll: [76, 19] },
  { p: '1783', t: 'polity', bg: 'ЯПОНИЯ', en: 'JAPAN', ll: [140, 38], rot: -58 },
  { p: '1783', t: 'polity', bg: 'ХОЛАНДСКА\nОСТ-ИНДИЯ', en: 'DUTCH\nEAST INDIES', ll: [114, -3] },
  { p: '1783', t: 'polity', bg: 'КЕЙПСКА\nКОЛОНИЯ', en: 'CAPE\nCOLONY', ll: [23, -31] },
  { p: '1783', t: 'polity', bg: 'МАРОКО', en: 'MOROCCO', ll: [-6, 32.2] },
  // допълнителни надписи на места
  { t: 'place', p: '1783', bg: 'Хавайски о-ви', en: 'Hawaiian Is.', ll: [-155, 23.5] },
  { t: 'place', p: '1783', bg: 'о-ви Кергелен', en: 'Kerguelen', ll: [69.5, -51] },
  { t: 'place', p: '1783', bg: 'о. Южна Джорджия', en: 'South Georgia', ll: [-36, -56.5] },
  { t: 'place', p: '1783', bg: 'Берингов пр.', en: 'Bering Strait', ll: [-168, 63.5] },
  { t: 'place', p: '1783', bg: 'н. Хорн', en: 'Cape Horn', ll: [-60, -58.5] },
  { t: 'place', p: '1300', bg: 'о. Суматра', en: 'Sumatra', ll: [100, -0.5] },
  { t: 'place', p: '1300', bg: 'Черно море', en: 'Black Sea', ll: [34.5, 43.0] },
  { t: 'place', p: '1300', bg: 'Каспийско море', en: 'Caspian Sea', ll: [50.5, 41.5] }
);
