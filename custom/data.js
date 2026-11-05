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
  { id: 'pt', layer: 'lyr_E_2', color: '#eb2a7b', name: { bg: 'Португалия', en: 'Portugal' } },
  { id: 'es', layer: 'lyr__5',  color: '#f6931e', name: { bg: 'Испания',    en: 'Spain' } },
  { id: 'gb', layer: 'lyr__6',  color: '#ec1d25', name: { bg: 'Англия',     en: 'England' } },
  { id: 'fr', layer: 'lyr__3',  color: '#2e3190', name: { bg: 'Франция',    en: 'France' } },
  { id: 'nl', layer: 'lyr__4',  color: '#009345', name: { bg: 'Нидерландия', en: 'Netherlands' } }
];

/* ---------- Атрибути на експедициите (ключ = слой:id на обекта) ----------
   photo = име на файл в папка images/ (без разширение; .jpg/.jpeg/.png/.webp се пробват автоматично) */
XP.exp = {
  'lyr_E_2:1': { photo: 'Dias',
    name: { bg: 'Бартоломеу Диаш', en: 'Bartolomeu Dias' },
    life: { bg: 'ок. 1450 – 1500', en: 'c. 1450 – 1500' },
    country: { bg: 'Португалия', en: 'Portugal' },
    from: { bg: 'Лисабон, Португалия', en: 'Lisbon, Portugal' },
    desc: {
      bg: 'Първият европеец, заобиколил най-южната точка на Африка – нос Добра надежда (наричан от него Бурен нос). Плаването показва, че от Атлантическия океан може да се стигне до Индийския, и отваря пътя към Индия.',
      en: 'The first European to round the southern tip of Africa, the Cape of Good Hope (which he called the Cape of Storms). His voyage showed that the Atlantic can be linked with the Indian Ocean and opened the way to India.' } },

  'lyr_E_2:2': { photo: 'Vasco_da_Gama_',
    name: { bg: 'Васко да Гама', en: 'Vasco da Gama' },
    life: { bg: 'ок. 1460 – 1524', en: 'c. 1460 – 1524' },
    country: { bg: 'Португалия', en: 'Portugal' },
    from: { bg: 'Лисабон, Португалия', en: 'Lisbon, Portugal' },
    desc: {
      bg: 'Открива морския път от Европа до Индия около Африка. През 1498 г. достига Каликут на Малабарския бряг и осигурява на Португалия пряк достъп до търговията с подправки.',
      en: 'Discovered the sea route from Europe to India around Africa. In 1498 he reached Calicut on the Malabar coast, giving Portugal direct access to the spice trade.' } },

  'lyr__5:3': { photo: 'Columb',
    name: { bg: 'Христофор Колумб', en: 'Christopher Columbus' },
    life: { bg: '1451 – 1506', en: '1451 – 1506' },
    country: { bg: 'Испания', en: 'Spain' },
    from: { bg: 'Палос де ла Фронтера, Испания', en: 'Palos de la Frontera, Spain' },
    desc: {
      bg: 'Търси западен път към Индия и вместо това стига до Бахамските острови (о. Сан Салвадор, 12 октомври 1492 г.), Куба и Хаити. Започват постоянните контакти между Европа и Америка.',
      en: 'Seeking a western route to Asia, he instead reached the Bahamas (San Salvador, 12 October 1492), Cuba and Hispaniola. Lasting contact between Europe and the Americas begins.' } },

  'lyr__6:1': { photo: 'John Cabot',
    name: { bg: 'Джон Кабот', en: 'John Cabot' },
    life: { bg: 'ок. 1450 – ок. 1500', en: 'c. 1450 – c. 1500' },
    country: { bg: 'Англия', en: 'England' },
    from: { bg: 'Бристъл, Англия', en: 'Bristol, England' },
    desc: {
      bg: 'Италианец (Джовани Кабото) на английска служба. През 1497 г. достига бреговете на Северна Америка (района на Нюфаундленд и нос Бретон) – основание за по-късните английски претенции към региона.',
      en: 'An Italian (Giovanni Caboto) in English service. In 1497 he reached the coast of North America (the Newfoundland and Cape Breton area), the basis of later English claims in the region.' } },

  'lyr__5:4': { photo: 'Columb',
    name: { bg: 'Христофор Колумб', en: 'Christopher Columbus' },
    life: { bg: '1451 – 1506', en: '1451 – 1506' },
    country: { bg: 'Испания', en: 'Spain' },
    from: { bg: 'Кадис, Испания', en: 'Cádiz, Spain' },
    desc: {
      bg: 'Четвърто плаване: изследва бреговете на Централна Америка – от Хондурас през Никарагуа и Коста Рика до Панама – в търсене на проход към Индийския океан.',
      en: 'Fourth voyage: he explored the coast of Central America – from Honduras through Nicaragua and Costa Rica to Panama – looking for a passage to the Indian Ocean.' } },

  'lyr__5:1': { photo: 'Magelan',
    name: { bg: 'Фернандо Магелан', en: 'Ferdinand Magellan' },
    life: { bg: 'ок. 1480 – 1521', en: 'c. 1480 – 1521' },
    country: { bg: 'Испания', en: 'Spain' },
    from: { bg: 'Санлукар де Баррамеда, Испания', en: 'Sanlúcar de Barrameda, Spain' },
    desc: {
      bg: 'Португалец на испанска служба. Открива пролива в южния край на Южна Америка (Магеланов проток, 1520 г.) и пресича Тихия океан. Загива във Филипините през 1521 г., но експедицията му извършва първото околосветско плаване.',
      en: 'A Portuguese navigator in Spanish service. He found the strait at the southern tip of South America (Strait of Magellan, 1520) and crossed the Pacific. He was killed in the Philippines in 1521, but his expedition completed the first circumnavigation of the globe.' } },

  'lyr__5:2': { photo: 'Elcano',
    name: { bg: 'Хуан Себастиан де Елкано', en: 'Juan Sebastián Elcano' },
    life: { bg: '1486 – 1526', en: '1486 – 1526' },
    country: { bg: 'Испания', en: 'Spain' },
    from: { bg: 'Санлукар де Баррамеда, Испания (експедицията на Магелан)', en: 'Sanlúcar de Barrameda, Spain (Magellan’s expedition)' },
    desc: {
      bg: 'След смъртта на Магелан поема командването и през 1522 г. завършва първото околосветско плаване на кораба „Виктория“: през Индийския океан, около нос Добра надежда, обратно до Испания.',
      en: 'After Magellan’s death he took command and in 1522 completed the first circumnavigation of the globe aboard the Victoria: across the Indian Ocean, around the Cape of Good Hope and back to Spain.' } },

  'lyr__3:1': { photo: 'Cartier',
    name: { bg: 'Жак Картие', en: 'Jacques Cartier' },
    life: { bg: '1491 – 1557', en: '1491 – 1557' },
    country: { bg: 'Франция', en: 'France' },
    from: { bg: 'Сен Мало, Франция', en: 'Saint-Malo, France' },
    desc: {
      bg: 'Изследва залива Свети Лаврентий и бреговете на Канада и обявява земите за френско владение (1534 г.) – началото на Нова Франция.',
      en: 'Explored the Gulf of St. Lawrence and the coast of Canada and claimed the land for France (1534) – the beginning of New France.' } },

  'lyr__4:1': { photo: 'Abel_Tasman',
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
  { t: 'polity', bg: 'АНГЛИЯ', en: 'ENGLAND', ll: [-6.2, 53.4] },
  { t: 'polity', bg: 'ФРАНЦИЯ', en: 'FRANCE', ll: [2.4, 46.4] },
  { t: 'polity', bg: 'ПОРТУГАЛИЯ', en: 'PORTUGAL', ll: [-10.4, 41.6], al: 'right' },
  { t: 'polity', bg: 'ИСПАНИЯ', en: 'SPAIN', ll: [-3.7, 40.3] },
  { t: 'polity', sp: 1, bg: 'ДАНИЯ', en: 'DENMARK-NORWAY', ll: [9.5, 63.6], rot: -62 },
  { t: 'polity', bg: 'ШВЕЦИЯ', en: 'SWEDEN', ll: [16, 61.2] },
  { t: 'polity', sp: 1, bg: 'ПОЛША', en: 'POLAND', ll: [21, 52.2] },
  { t: 'polity', bg: 'МОСКОВСКО КНЯЖ.', en: 'GRAND DUCHY OF MOSCOW', ll: [46, 60.5], rot: -26 },
  { t: 'polity', bg: 'ОСМАНСКА\nДЪРЖАВА', en: 'OTTOMAN\nEMPIRE', ll: [23, 39.6], rot: 20 },
  { t: 'polity', bg: 'МАМЕЛЮКСКИ\nСУЛТАНАТ', en: 'MAMLUK\nSULTANATE', ll: [30.8, 24.5], rot: 62 },
  { t: 'polity', bg: 'ДЕЛХИЙСКИ\nСУЛТАНАТ', en: 'DELHI\nSULTANATE', ll: [81.5, 34.2], rot: -20 },
  { t: 'polity', sp: 1, bg: 'КИТАЙ', en: 'CHINA', ll: [112, 33] },
  { t: 'polity', bg: 'ЯПОНИЯ', en: 'JAPAN', ll: [148, 35], rot: -58 },
  { t: 'polity', bg: 'ИМПЕРИЯ\nНА АЦТЕКИТЕ', en: 'AZTEC\nEMPIRE', ll: [-101, 14] },
  { t: 'polity', bg: 'ИМПЕРИЯ\nНА ИНКИТЕ', en: 'INCA\nEMPIRE', ll: [-62, -4.5] },
  { t: 'num', bg: '1', en: '1', ll: [5.4, 52.2] },
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
