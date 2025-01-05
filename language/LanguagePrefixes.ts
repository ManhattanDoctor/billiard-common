import { ILanguageProjectSettings } from '@ts-core/language';

export let LanguageProjects: Array<ILanguageProjectSettings> = [
    {
        name: 'billiard',
        locales: ['ru'],
        prefixes: [
            '.json',
            'Custom.json',

            'User.json',

            'Payment.json',
            'Management.json'
        ]
    }
]
