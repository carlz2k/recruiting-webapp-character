import { v4 as uuidv4 } from 'uuid';

import { ATTRIBUTE_LIST, ININITIAL_ATTRIBUTE_POINT, INTELLIGENCE_ATTRIBUTE, INTELLIGENCE_MODIFIER_MULTIPLIER, SKILL_LIST } from "../consts";
import { Attribute } from "./Attribute";
import { Skill } from './Skill';

export class Character {
  constructor() {
    this.id = uuidv4();
    this.attributes = ATTRIBUTE_LIST.map(
      (attributeName) => {
        return new Attribute(
          attributeName, ININITIAL_ATTRIBUTE_POINT, 0
        );
      }
    )
    this._createSkills();
  }

  getTotalAttributePoints() {
    this.attributes.reduce(
      (acc, current) => {
        return acc + current.points;
      }
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

  getTotalSkillPointsWithoutAttributeModifers() {
    return this.skills.reduce((acc, skill) => {
      return acc + skill.points;
    }, 0)
  }

  getTotalSkillPointsAvailable() {
    const intelligenceAttributeModifier = this.attributes?.find(
      (attr) => attr.name === INTELLIGENCE_ATTRIBUTE
    )?.modifier;
    return 10 + INTELLIGENCE_MODIFIER_MULTIPLIER * intelligenceAttributeModifier - this.getTotalSkillPointsWithoutAttributeModifers();
  }

  static clone(original) {
    const newCharacter = new Character();

    if (original?.id) {
      newCharacter.attributes = original.attributes?.map(
        (attr) => new Attribute(attr.name, attr.points, attr.modifier)
      );
      newCharacter.skill = original.skills?.map(
        (skill) => new Skill(skill.name, skill.points, skill.relatedAttribute)
      )
      newCharacter.id = original.id;
    }

    return newCharacter;
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
}