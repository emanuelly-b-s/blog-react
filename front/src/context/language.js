import React, { useState } from "react";

export const LanguageContext = React.createContext();
LanguageContext.displayName = "Language";

export const LanguageProvider = ({ children }) => {
  const [isPortuguese, setIsPortuguese] = useState(false);

  const portuguese = {
    abbreviation: "PT",
    home: "Inicio",
    add: "Adicionar",
    comments: "comentários",
    title: "Título",
    text: "Texto",
    post: "Postar",
    articleInput: "Escreva o que esta pensando",
    articleError:
      "Erro ao postar, verifique se o título e o texto estão preenchidos",
    logout: "Sair",
  };

  const english = {
    abbreviation: "EN",
    home: "Home",
    add: "Add",
    comments: "comments",
    title: "Title",
    text: "Text",
    post: "Post",
    articleInput: "Write what you are thinking",
    articleError: "Error inserting post, check if title and text are filled     ",
    logout: "Logout",
};

  const [text, setText] = useState(english);

  function setLanguage() {
    setIsPortuguese(!isPortuguese);
    if (isPortuguese) setText(english);
    if (!isPortuguese) setText(portuguese);
  }

  return (
    <LanguageContext.Provider
      value={{
        isPortuguese,
        setLanguage,
        text,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
