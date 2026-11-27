import type { DialogueLine } from '../types';

export interface Conversation {
    id: string;
    category: string;
    tags: string[];
    lines: DialogueLine[];
}

export const conversations: Conversation[] = [
    {
        id: 'conv-intro',
        category: 'social',
        tags: ['social'],
        lines: [
            { speaker: 'A', text: 'Bon dia, kon ta bai?', translation: 'Good morning, how are you?' },
            { speaker: 'B', text: 'Mi ta bon, danki. I abo?', translation: 'I am fine, thanks. And you?' },
            { speaker: 'A', text: 'Mi tambe ta bon.', translation: 'I am also fine.' },
            { speaker: 'B', text: 'Kon yama bo?', translation: 'What is your name?', isInteractive: true }, // Interactive part
            { speaker: 'A', text: 'Mi yama Juan. Muchu gustu.', translation: 'My name is Juan. Nice to meet you.' }
        ]
    },
    {
        id: 'conv-shop-fruit',
        category: 'shopping',
        tags: ['supermarket'],
        lines: [
            { speaker: 'A', text: 'Bon tardi. Bo tin apel?', translation: 'Good afternoon. Do you have apples?' },
            { speaker: 'B', text: 'Si, nos tin apel kòrá i bèrdè.', translation: 'Yes, we have red and green apples.' },
            { speaker: 'A', text: 'Mi kièr sinku apel kòrá por fabor.', translation: 'I want five red apples please.', isInteractive: true },
            { speaker: 'B', text: 'Ata nan aki.', translation: 'Here they are.' }
        ]
    },
    {
        id: 'conv-restaurant-order',
        category: 'restaurant',
        tags: ['food', 'restaurant'],
        lines: [
            { speaker: 'A', text: 'Bon nochi. Mi por haña e menú?', translation: 'Good evening. Can I have the menu?' },
            { speaker: 'B', text: 'Sigur, ata e menú aki.', translation: 'Sure, here is the menu.' },
            { speaker: 'A', text: 'Danki. Bo tin sòpi di piská?', translation: 'Thanks. Do you have fish soup?', isInteractive: true },
            { speaker: 'B', text: 'Si, e sòpi ta dushi awe.', translation: 'Yes, the soup is delicious today.' }
        ]
    },
    {
        id: 'conv-directions-beach',
        category: 'directions',
        tags: ['places', 'directions'],
        lines: [
            { speaker: 'A', text: 'Pordon, unda e laman ta?', translation: 'Excuse me, where is the sea?' },
            { speaker: 'B', text: 'E laman ta serka.', translation: 'The sea is close.' },
            { speaker: 'A', text: 'Mi mester kana of kore auto?', translation: 'Do I need to walk or drive?', isInteractive: true },
            { speaker: 'B', text: 'Bo por kana. Sigui padilanti.', translation: 'You can walk. Go straight.' }
        ]
    },
    {
        id: 'conv-family-siblings',
        category: 'family',
        tags: ['family'],
        lines: [
            { speaker: 'A', text: 'Bo tin ruman?', translation: 'Do you have siblings?' },
            { speaker: 'B', text: 'Si, mi tin un ruman hòmber.', translation: 'Yes, I have one brother.' },
            { speaker: 'A', text: 'Kon e yama?', translation: 'What is his name?', isInteractive: true },
            { speaker: 'B', text: 'E yama Carlos. E ta haltu.', translation: 'His name is Carlos. He is tall.' }
        ]
    },
    {
        id: 'conv-work-new',
        category: 'work',
        tags: ['work', 'office'],
        lines: [
            { speaker: 'A', text: 'Bon bini na nos ofisina.', translation: 'Welcome to our office.' },
            { speaker: 'B', text: 'Masha danki. Unda mi lugá ta?', translation: 'Thank you very much. Where is my place/desk?' },
            { speaker: 'A', text: 'Bo lugá ta banda di e bentana.', translation: 'Your place is next to the window.', isInteractive: true },
            { speaker: 'B', text: 'Fantástiko. Mi gusta lus.', translation: 'Fantastic. I like light.' }
        ]
    },
    {
        id: 'conv-health-doctor',
        category: 'health',
        tags: ['health', 'doctor'],
        lines: [
            { speaker: 'A', text: 'Bon dia dòkter.', translation: 'Good morning doctor.' },
            { speaker: 'B', text: 'Bon dia. Kiko ta e problema?', translation: 'Good morning. What is the problem?' },
            { speaker: 'A', text: 'Mi tin doló di kabes.', translation: 'I have a headache.', isInteractive: true },
            { speaker: 'B', text: 'Tuma e remedi aki dos biaha pa dia.', translation: 'Take this medicine twice a day.' }
        ]
    },
    // --- GRAMMAR DIALOGUES ---
    {
        id: 'conv-gram-ta',
        category: 'grammar',
        tags: ['grammar-ta'],
        lines: [
            { speaker: 'A', text: 'Kiko bo ta hasi?', translation: 'What are you doing?' },
            { speaker: 'B', text: 'Mi ta kushina awo.', translation: 'I am cooking right now.' },
            { speaker: 'A', text: 'Kiko bo ta traha?', translation: 'What are you making?', isInteractive: true },
            { speaker: 'B', text: 'Mi ta traha sòpi.', translation: 'I am making soup.' }
        ]
    },
    {
        id: 'conv-gram-tabata',
        category: 'grammar',
        tags: ['grammar-tabata'],
        lines: [
            { speaker: 'A', text: 'Unda bo tabata ayera?', translation: 'Where were you yesterday?' },
            { speaker: 'B', text: 'Mi tabata na laman.', translation: 'I was at the sea.' },
            { speaker: 'A', text: 'E awa tabata dushi?', translation: 'Was the water nice?', isInteractive: true },
            { speaker: 'B', text: 'Si, e tabata masha dushi.', translation: 'Yes, it was very nice.' }
        ]
    },
    {
        id: 'conv-gram-lo',
        category: 'grammar',
        tags: ['grammar-lo'],
        lines: [
            { speaker: 'A', text: 'Kiko nos lo hasi mañan?', translation: 'What will we do tomorrow?' },
            { speaker: 'B', text: 'Nos lo bai sinema.', translation: 'We will go to the cinema.' },
            { speaker: 'A', text: 'Ki pelíkula nos lo wak?', translation: 'What movie will we watch?', isInteractive: true },
            { speaker: 'B', text: 'Nos lo wak e pelíkula nobo.', translation: 'We will watch the new movie.' }
        ]
    },
    // --- EXAM / MIXED TENSE CONVERSATIONS ---
    {
        id: 'conv-exam-weekend',
        category: 'grammar',
        tags: ['exam-mixed'],
        lines: [
            { speaker: 'A', text: 'Kon bo wikènt tabata?', translation: 'How was your weekend? (Past)' },
            { speaker: 'B', text: 'E tabata bon. Mi a bai laman.', translation: 'It was good. I went to the sea. (Past)' },
            { speaker: 'A', text: 'Dushi. Kiko bo ta hasi awo?', translation: 'Nice. What are you doing now? (Present)' },
            { speaker: 'B', text: 'Mi ta traha, pero mañan mi lo drumi.', translation: 'I am working, but tomorrow I will sleep. (Pres/Fut)' },
            { speaker: 'A', text: 'Bo lo bai fiesta mañan anochi?', translation: 'Will you go to the party tomorrow night? (Future)', isInteractive: true },
            { speaker: 'B', text: 'Si, nos lo baila henter anochi.', translation: 'Yes, we will dance all night. (Future)' }
        ]
    },
    {
        id: 'conv-exam-career',
        category: 'grammar',
        tags: ['exam-mixed'],
        lines: [
            { speaker: 'A', text: 'Unda bo a traha antes?', translation: 'Where did you work before? (Past)' },
            { speaker: 'B', text: 'Mi a traha na un banko.', translation: 'I worked at a bank. (Past)' },
            { speaker: 'A', text: 'I awo, unda bo ta traha?', translation: 'And now, where do you work? (Present)', isInteractive: true },
            { speaker: 'B', text: 'Awo mi ta un dosente.', translation: 'Now I am a teacher. (Present)' },
            { speaker: 'A', text: 'Kiko bo lo hasi otro aña?', translation: 'What will you do next year? (Future)' },
            { speaker: 'B', text: 'Mi lo biaha pa Europa.', translation: 'I will travel to Europe. (Future)' }
        ]
    },
    // --- SOCIAL MEETUP (Unit 7 Bubble Conversation) ---
    {
        id: 'conv-social-meetup',
        category: 'social',
        tags: ['social-meetup'],
        lines: [
            { speaker: 'A', text: 'Hé! Kon ta bai?', translation: 'Hey! How is it going?' },
            { speaker: 'B', text: 'Hé! Tur kos ta bon. I bo?', translation: 'Hey! Everything is good. And you?' },
            { speaker: 'A', text: 'Trankil. Kiko bo ta hasi aki?', translation: 'Chilled. What are you doing here?', isInteractive: true },
            { speaker: 'B', text: 'Mi ta buska un regalo pa mi mama.', translation: 'I am looking for a gift for my mom.' },
            { speaker: 'A', text: 'Aha, wak e tienda aya.', translation: 'Aha, look at that shop over there.' },
            { speaker: 'B', text: 'Danki! Nos ta papia después.', translation: 'Thanks! We’ll talk later.' }
        ]
    },
    {
        id: 'conv-social-plans',
        category: 'social',
        tags: ['social-meetup'],
        lines: [
            { speaker: 'A', text: 'Bo ta liber awe nochi?', translation: 'Are you free tonight?' },
            { speaker: 'B', text: 'Si, mi no ta traha. Dikon?', translation: 'Yes, I am not working. Why?' },
            { speaker: 'A', text: 'Ban kome algu na e restorant nobo.', translation: 'Let\'s eat something at the new restaurant.', isInteractive: true },
            { speaker: 'B', text: 'Bon idea! Ki ora?', translation: 'Good idea! What time?' },
            { speaker: 'A', text: 'Ocho or.', translation: 'Eight o\'clock.' }
        ]
    }
];
