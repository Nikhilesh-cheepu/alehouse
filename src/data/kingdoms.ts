export interface Kingdom {
  id: string
  name: string
  fullName: string
  description: string
  images: {
    mobile: string
    desktop: string
  }
  voiceKey: string
  voiceFile: string
  color: string
  accentColor: string
}

export const kingdoms: Kingdom[] = [
  {
    id: 'jon',
    name: 'Jon',
    fullName: 'Jon Snow',
    description: 'The Bastard of Winterfell',
    images: {
      mobile: '/kingdoms/mobile/jonp.png',
      desktop: '/kingdoms/desktop/jonl.png'
    },
    voiceKey: 'jon_voice',
    voiceFile: '/voices/jon-voice.mp3',
    color: '#2c3e50',
    accentColor: '#3498db'
  },
  {
    id: 'dan',
    name: 'Daenerys',
    fullName: 'Daenerys Targaryen',
    description: 'The Mother of Dragons',
    images: {
      mobile: '/kingdoms/mobile/danp.png',
      desktop: '/kingdoms/desktop/danl.png'
    },
    voiceKey: 'dan_voice',
    voiceFile: '/voices/dan-voice.mp3',
    color: '#8e44ad',
    accentColor: '#e74c3c'
  },
  {
    id: 'tyr',
    name: 'Tyrion',
    fullName: 'Tyrion Lannister',
    description: 'The Imp',
    images: {
      mobile: '/kingdoms/mobile/tyrp.png',
      desktop: '/kingdoms/desktop/tyrl.png'
    },
    voiceKey: 'tyr_voice',
    voiceFile: '/voices/tyr-voice.mp3',
    color: '#f39c12',
    accentColor: '#e67e22'
  },
  {
    id: 'ary',
    name: 'Arya',
    fullName: 'Arya Stark',
    description: 'The Faceless One',
    images: {
      mobile: '/kingdoms/mobile/aryp.png',
      desktop: '/kingdoms/desktop/aryl.png'
    },
    voiceKey: 'ary_voice',
    voiceFile: '/voices/ary-voice.mp3',
    color: '#34495e',
    accentColor: '#95a5a6'
  },
  {
    id: 'cer',
    name: 'Cersei',
    fullName: 'Cersei Lannister',
    description: 'The Queen',
    images: {
      mobile: '/kingdoms/mobile/cerp.jpg',
      desktop: '/kingdoms/desktop/cerl.png'
    },
    voiceKey: 'cer_voice',
    voiceFile: '/voices/cer-voice.mp3',
    color: '#c0392b',
    accentColor: '#e74c3c'
  },
  {
    id: 'hn',
    name: 'House',
    fullName: 'House of Night',
    description: 'The Dark Realm',
    images: {
      mobile: '/kingdoms/mobile/hnp.png',
      desktop: '/kingdoms/desktop/hnl.png'
    },
    voiceKey: 'hn_voice',
    voiceFile: '/voices/hn-voice.mp3',
    color: '#2c3e50',
    accentColor: '#9b59b6'
  },
  {
    id: 'jf',
    name: 'Joffrey',
    fullName: 'Joffrey Baratheon',
    description: 'The Boy King',
    images: {
      mobile: '/kingdoms/mobile/jfp.png',
      desktop: '/kingdoms/desktop/jfl.png'
    },
    voiceKey: 'jf_voice',
    voiceFile: '/voices/jf-voice.mp3',
    color: '#e67e22',
    accentColor: '#f1c40f'
  }
] 