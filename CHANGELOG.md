## 0.12.1

### Patches

- Fix `server` mode can't process dependencies.

## 0.12.0

### Improve & Features

- Drop `happy-dom`. (Reduce installer size)
- Using `ast scanner` replace vm.

## 0.11.3

### Minor

- `transformIndexHtml` now return HTMLDescriptor (After happy-dom v9 It can't disabled warning logic)

## 0.11.2

### Minor

- Bump `happy-dom` version. (Reduce unnecessary installation size).
- Remove `@types/estree`

## 0.11.1

### Patches

- Fix `eraseDuplicatedVariableDeclaration` use error node selector.

## 0.11.0

### Feature & Improves

- Exports fields willn't be pre-processed.
- Add `apply` option.
- Plugin now return an array.

### Patches

- Fix `node_modules` can't processed.

## 0.10.0

### Feaature & Improves

- Support load submodule and join analyze. (Package.json "exports" module)

Why we need it? Because more and more packages provide the exports fileld.So we should
support it. In past we can't process like "import ReactDOM from 'react-dom/client'". But now 
we can do it.


## 0.9.3

### Patches

- Fix "require.resolve" should work with “type:module”.

## 0.9.2

### Patches

- Fix "type:module" can't use this package.

## 0.9.0

### Feature & Improves

- Make firendly types
- Add `resolve` option for custom all url.

## 0.8.0

### Features & Improves

- modules add new attribute `resolve` & `relativeModule`

## 0.7.0

### Features & Improves

- node set extra info.

## 0.6.0

# Background

### Features & Improves

- Supprot `export * from 'module'`
- Using `babel` replace magic str

## 0.3.3

# Background

### Patches

- Fix transform generator final link attribute missing space.

## 0.3.2

# Background

### Patches

- Fix es module pacakge can't load.
  In past we only use require to load module. But the `esm` is more and more popular. So that support load `esm` package is necessary.

## 0.3.1

# Background

### Patches

- Fix transform hook can't work.
