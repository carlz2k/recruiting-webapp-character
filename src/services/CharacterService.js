import axios from "axios";
import { Character } from "../models/Charater";

const CHARACTER_URL = 'https://recruiting.verylongdomaintotestwith.ca/api/carlz2k/character';

export class CharacterService {
  constructor(nameGenerator) {
    this._nameGenerator = nameGenerator;
  }

  create() {
    return new Character(this._nameGenerator.generateNext());
  }

  save(characters = []) {
    characters.forEach(
      (character) => {
        if (character) {
          const characterDTO = Character.fromDTO(character);
          axios.post(CHARACTER_URL, characterDTO);
        }
      }
    )
  }

  getAll() {
    const characterDTOs = axios.get(CHARACTER_URL);
    const characters = characterDTOs.filter(dto => !!dto).map(dto => Character.fromDTO(dto));
    this._nameGenerator.init(characters.map(character => character.name));
    return characters;
  }
}
