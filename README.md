
# Koopere app

Este repositório contém uma aplicação mobile desenvolvida em React Native. Abaixo estão as instruções detalhadas para configurar e executar o projeto em dispositivos Android e iOS.  

---

## Pré-requisitos  

Certifique-se de que as seguintes ferramentas e dependências estão instaladas no seu ambiente:  
- [Node.js](https://nodejs.org/)  
- [Yarn](https://yarnpkg.com/)  
- [React Native CLI](https://reactnative.dev/docs/environment-setup)  
- [Android Studio](https://developer.android.com/studio) (para emulador Android ou dispositivo físico)  
- [Xcode](https://developer.apple.com/xcode/) (para emulador iOS ou dispositivo físico - apenas em macOS)  

---

## Configurando o ambiente  

1. **Instale as dependências**  

```bash  
yarn  
```  

2. **Configuração adicional para iOS (apenas em macOS):**  

Se estiver utilizando iOS, execute os comandos abaixo para instalar as dependências nativas do projeto:  

```bash  
cd ios  
pod install  
cd ..  
```  

---

## Executando o projeto  

### Para Android  

Execute o comando abaixo para iniciar o aplicativo no emulador ou dispositivo Android:  

```bash  
yarn android  
```  

### Para iOS  

Execute o comando abaixo para iniciar o aplicativo no emulador ou dispositivo iOS:  

```bash  
yarn ios  
```  

---

## Observações  

- Certifique-se de que o ambiente do React Native está configurado corretamente antes de executar os comandos. Consulte a [documentação oficial](https://reactnative.dev/docs/environment-setup) caso encontre problemas.  
- Para executar o aplicativo em um dispositivo físico, habilite o modo de desenvolvedor e depuração USB (Android) ou utilize o dispositivo conectado ao Xcode (iOS).  

---
