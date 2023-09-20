import React, { useState } from "react";

export const LanguageContext = React.createContext();
LanguageContext.displayName = "Language";

export const LanguageProvider = ({ children }) => {
  const [isPortuguese, setIsPortuguese] = useState(false);

  const portuguese = {
    abbreviation: "PT",
    home: "Casa",
    add: "Adicionar",
    comments: "comentários",
    title: "Título",
    text: "Texto",
    post: "Postar",
    articleInput: "Digite Aqui seu Artigo",
    articleError:
      "Erro ao inserir o artigo, reveja as informações e tente novamente",
    boschBrazil: "Bosch no Brasil",
  };

  const english = {
    abbreviation: "EN",
    home: "Home",
    add: "Add",
    comments: "comments",
    title: "Title",
    text: "Text",
    post: "Post",
    articleInput: "Write your article here",
    articleError: "Error inserting the article",
    boschBrazil: "Bosch in Brazil",
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
