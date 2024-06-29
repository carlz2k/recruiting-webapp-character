import { createContext, useContext } from "react"
import { NameGenerator } from "../services/NameGenerator";
import { CharacterService } from "../services/CharacterService";

const ServicesProviderContext = createContext({});

export const ServicesProvider = (props) => {
  const services = {};
  services.characterService = new CharacterService(new NameGenerator());

  return (
    <ServicesProviderContext.Provider value={services}>
      {props.children}
    </ServicesProviderContext.Provider>
  )
}

export const useCharacterService = () => {
  const services = useContext(ServicesProviderContext);
  return services.characterService;
};
