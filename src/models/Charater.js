import { v4 as uuidv4 } from 'uuid';

import { ATTRIBUTE_LIST, ININITIAL_ATTRIBUTE_POINT, INTELLIGENCE_ATTRIBUTE, INTELLIGENCE_MODIFIER_MULTIPLIER, SKILL_LIST } from "../consts";
import { Attribute } from "./Attribute";
import { Skill } from './Skill';

export class Character {
  constructor(name = '') {
    this.name = name;
    this.id = uuidv4();
    this.attributes = ATTRIBUTE_LIST.map(
      (attributeName) => {
        return new Attribute(
          attributeName, ININITIAL_ATTRIBUTE_POINT
        );
      }
    )
    this._createSkills();
  }

  getTotalAttributePoints() {
    return this.attributes.reduce(
      (acc, current) => {
        return acc + current.points;
      }, 0
    )
  }

  increaseAttribute(attributeName, attributeModifier) {
    const attribute = this.attributes.find(
      (attr) => attr.name === attributeName
    );

    if (attribute) {
      attribute.add(attributeModifier);
    }
  }


  increaseSkill(skillName, isIncreasing = true) {
    const skill = this.skills.find(
      (s) => s.name === skillName
    );

    skill?.addPoint(isIncreasing);
  }

  resetAttributes() {
    this.attributes.forEach(
      (attr) => attr.reset()
    );
  }

  getTotalSkillPointsAvailable() {
    const intelligenceAttributeModifier = this.attributes?.find(
      (attr) => attr.name === INTELLIGENCE_ATTRIBUTE
    )?.modifier;
    return 10 + INTELLIGENCE_MODIFIER_MULTIPLIER * intelligenceAttributeModifier - this._getTotalSkillPointsSpent();
  }

  static clone(original) {
    const newCharacter = new Character();

    if (original?.id) {
      newCharacter.attributes = original.attributes?.map(
        (attr) => new Attribute(attr.name, attr.points)
      );
      newCharacter.skills = original.skills?.map(
        (skill) => new Skill(skill.name, skill.points, skill.relatedAttribute)
      )
      newCharacter.id = original.id;
    }

    return newCharacter;
  }

  static fromDTO(dto) {
    const newCharacter = new Character();

    const attributeNames = Object.keys(dto.attributes || {});
    newCharacter.attributes = attributeNames?.map(
      (name) => {
        const points = dto.attributes[name];
        return new Attribute(name, points);
      }
    );

    const skillsNames = Object.keys(dto.skills || {});
    newCharacter.skills = skillsNames?.map(
      (name) => {
        const relatedAttribute = newCharacter.attributes.find(
          (attr) => {
            const attrName = SKILL_LIST.find((skill) => skill.name === name).attributeModifier;
            return attr.name === attrName;
          }
        );

        return new Skill(name, dto.skills[name], relatedAttribute);
      }
    )
    newCharacter.id = dto.id;
    newCharacter.name = dto.name;

    return newCharacter;
  }

  static toDTO(character) {
    const newCharacterDTO = {};

    const attributes = character.attributes;

    newCharacterDTO.attributes = {};

    attributes?.forEach(
      (attr) => {
        newCharacterDTO.attributes[attr.name] = attr.points;
      }
    );

    const skills = character.skills;

    newCharacterDTO.skills = {};

    skills?.forEach(
      (skill) => {
        newCharacterDTO.skills[skill.name] = skill.points;
      }
    );

    newCharacterDTO.id = character.id;
    newCharacterDTO.name = character.name;

    return newCharacterDTO;
  }

  _getTotalSkillPointsSpent() {
    return this.skills.reduce((acc, skill) => {
      return acc + skill.points;
    }, 0);
  }

  _createSkills() {
    this.skills = SKILL_LIST.map(
      (skill) => {
        const attribute = this.attributes.find(
          (attr) => attr.name === skill.attributeModifier
        )

        return new Skill(
          skill.name, 0, attribute
        );
      }
    )
  }

  static _toModifier(points) {
    return (points - ININITIAL_ATTRIBUTE_POINT) / 2;
  }
}