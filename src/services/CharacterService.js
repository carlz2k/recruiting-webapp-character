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

  async save(characters = []) {
    const characterDTOs = characters.filter(c => !!c).map(
      (character) => Character.toDTO(character)
    ) || [];

    const payload = {
      _collections: characterDTOs,
      size: characterDTOs.length
    }

    return axios.post(CHARACTER_URL, payload);
  }

  async reset() {
    return this.save([]);
  }

  async getAll() {
    const response = await axios.get(CHARACTER_URL);
    if (response?.data?.body?._collections?.length) {
      const characterDTOs = response?.data?.body?._collections;
      const characters = characterDTOs.filter(dto => !!dto).map(dto => Character.fromDTO(dto));
      this._nameGenerator.init(characters.map(character => character.name));

      return characters;
    }

    return [];
  }
}
