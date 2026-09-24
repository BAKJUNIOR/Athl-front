# AthlLogisticsFront

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 22.1.8.

## Architecture

Le code applicatif (`src/app/`) suit une architecture modulaire par domaine métier (feature-based) :

```
src/app/
├── core/           # Transverse à toute l'app
│   ├── guards/         # Guards de routes (auth, rôles...)
│   ├── interceptors/   # Interceptors HTTP (token JWT, erreurs...)
│   ├── services/       # Services globaux partagés
│   ├── initializers/   # Initialisation au démarrage de l'app
│   ├── utils/           # Fonctions utilitaires génériques
│   └── pagination/      # Logique de pagination partagée
├── domains/        # Cœur métier, un dossier par fonctionnalité
│   └── <nom>/
│       ├── domain/          # Entités + logique métier, indépendant d'Angular/HTTP
│       │   ├── <nom>.entity.ts
│       │   └── enum/
│       ├── infrastructure/  # Implémentations concrètes (adapters)
│       │   └── api/<nom>.api.ts   # Appels HTTP réels
│       └── presentation/    # UI Angular
│           ├── pages/*.component.ts  # Composants standalone
│           └── routes.ts             # Routes du domaine (lazy-loadées)
├── layout/         # Coquille visuelle de l'appli
│   ├── sidebar/
│   ├── topbar/
│   ├── breadcrumb/
│   └── main-layout/
└── shared/         # Composants UI réutilisables, sans logique métier
    └── ui/
```

**Principe** : dans un domaine, `presentation` dépend de `domain`, et `domain` ne dépend jamais de `infrastructure` — c'est `infrastructure` qui implémente les contrats définis dans `domain`. Le domaine `vitrine/` (site public ATHL) sert d'exemple concret à dupliquer pour chaque nouvelle fonctionnalité (ex: `shipments/`, `fleet/`, `clients/`).

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
