/* eslint-disable @typescript-eslint/camelcase */
export const bookPages = [
  {
    job: 'astronaut',
    order: 1,
    contents: [
      {
        value: `"We are about to leave the station. Please climb aboard the train so you will not be left behind". Boys heard the old man with a long beard as a scarf's voice rom the train said.<br ><br >The yellow-haired teacher thanked <strong>[name]</strong> for her hard work and off [name] went towards the train.`,
        style: `{"color":"white","bottom":"5%","left":"15%"}`,
      },
      {
        value: `"We are about to leave the station. Please climb aboard the train so you will not be left behind". Boys heard the old man with a long beard as a scarf's voice rom the train said.<br >The yellow-haired teacher thanked <strong>[name]</strong> for her hard work and off [name] went towards the train.`,
        style: `{"color":"white","top":"5%","right":"15%"}`,
      },
    ],
  },
  {
    job: 'astronaut',
    order: 2,
    contents: [
      {
        value: `"We are about to leave the station. Please climb aboard the train so you will not be left behind". Boys heard the old man with a long beard as a scarf's voice rom the train said.<br >The yellow-haired teacher thanked <strong>[name]</strong> for her hard work and off [name] went towards the train.`,
        style: `{"color":"white","bottom":"5%","left":"15%"}`,
      },
      {
        value: `"We are about to leave the station. Please climb aboard the train so you will not be left behind". Boys heard the old man with a long beard as a scarf's voice rom the train said.<br >The yellow-haired teacher thanked <strong>[name]</strong> for her hard work and off [name] went towards the train.`,
        style: `{"color":"white","top":"5%","right":"15%"}`,
      },
    ],
  },
  {
    job: 'astronaut',
    order: 3,
    contents: [
      {
        value: `"We are about to leave the station. Please climb aboard the train so you will not be left behind". Boys heard the old man with a long beard as a scarf's voice rom the train said.<br >The yellow-haired teacher thanked <strong>[name]</strong> for her hard work and off [name] went towards the train.`,
        style: `{"color":"white","bottom":"5%","left":"15%"}`,
      },
      {
        value: `"We are about to leave the station. Please climb aboard the train so you will not be left behind". Boys heard the old man with a long beard as a scarf's voice rom the train said.<br >The yellow-haired teacher thanked <strong>[name]</strong> for her hard work and off [name] went towards the train.`,
        style: `{"color":"white","top":"5%","right":"15%"}`,
      },
    ],
  },
  {
    job: 'astronaut',
    order: 4,
    contents: [
      {
        value: `"We are about to leave the station. Please climb aboard the train so you will not be left behind". Boys heard the old man with a long beard as a scarf's voice rom the train said.<br >The yellow-haired teacher thanked <strong>[name]</strong> for her hard work and off [name] went towards the train.`,
        style: `{"color":"white","bottom":"5%","left":"15%"}`,
      },
      {
        value: `"We are about to leave the station. Please climb aboard the train so you will not be left behind". Boys heard the old man with a long beard as a scarf's voice rom the train said.<br >The yellow-haired teacher thanked <strong>[name]</strong> for her hard work and off [name] went towards the train.`,
        style: `{"color":"white","top":"5%","right":"15%"}`,
      },
    ],
  },
];

export interface BookContent {
  created_at: string;
  deleted_at: null;
  english: string;
  id: number;
  indonesia: string;
  occupation: {
    created_at: string;
    deleted_at: null;
    description: null;
    id: number;
    indonesia: string;
    name: string;
    updated_at: null;
  };
  occupation_id: number;
  page_number: number;
  style: string;
  updated_at: null;
}
export const bookContentsMock: BookContent[] = [
  {
    created_at: '2020-04-23 11:39:53',
    deleted_at: null,
    english: 'Stepping out of the train, [name] and the yellow-haired teacher were in the classroom. ',
    id: 123,
    indonesia:
      'Melangkah keluar dari keretanya, [name] dan guru berambut kuning itu kini berada di sebuah ruang kelas. Di sana terlihat murid-murid sedang duduk di tempatnya mengerjakan sebuah tugas.',
    occupation: {
      created_at: '2020-03-10 22:10:07',
      deleted_at: null,
      description: null,
      id: 2,
      indonesia: 'Guru',
      name: 'Teacher',
      updated_at: null,
    },
    occupation_id: 2,
    page_number: 2,
    style: '{"color":"black","bottom":"5%","left":"7%","width":"20%"}',
    updated_at: null,
  },
  {
    created_at: '2020-04-23 11:39:53',
    deleted_at: null,
    english:
      "“Everyone, we have an assistant teacher today and he'll be doing some storytelling for you. Are you excited?” the yellow-haired teacher asked the children with joy.",
    id: 124,
    indonesia:
      '“Semuanya, kita sedang kedatangan guru pengganti hari ini dan ia akan mendongeng untuk kalian. Apa kalian mau mendengarnya?” Tanya si Guru berambut kuning itu pada mirid-muridnya.',
    occupation: {
      created_at: '2020-03-10 22:10:07',
      deleted_at: null,
      description: null,
      id: 2,
      indonesia: 'Guru',
      name: 'Teacher',
      updated_at: null,
    },
    occupation_id: 2,
    page_number: 2,
    style: '{"color":"black","top":"3%","right":"3%","width":"51%"}',
    updated_at: null,
  },
  {
    created_at: '2020-04-23 11:39:53',
    deleted_at: null,
    english: '“Yes!” the children cried out excitedly in unison.',
    id: 131,
    indonesia: '“Mauuu!” jawab semua murid serentak.',
    occupation: {
      created_at: '2020-03-10 22:10:07',
      deleted_at: null,
      description: null,
      id: 2,
      indonesia: 'Guru',
      name: 'Teacher',
      updated_at: null,
    },
    occupation_id: 2,
    page_number: 2,
    style: '{"color":"white","top":"40%","right":"29%","width":"20%"}',
    updated_at: null,
  },
];
