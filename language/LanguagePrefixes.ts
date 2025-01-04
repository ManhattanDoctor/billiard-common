import { ILanguageProjectSettings } from '@ts-core/language';

export let LanguageProjects: Array<ILanguageProjectSettings> = [
    {
        name: 'billiard',
        locales: ['ru'],
        prefixes: [
            '.json',
            'Custom.json',

            'User.json',
            'Comment.json',

            'Payment.json',
            'Management.json',

            'Main.json',
            'About.json'
        ]
    }
]
