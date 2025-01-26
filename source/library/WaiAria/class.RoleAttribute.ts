import { AriaAttribute, AriaCategory } from './abstr.AriaAttribute'
import {
	compositeRoles,
	landmarkRoles,
	regionRoles,
	roles,
	structureRoles,
	widgetRoles,
	windowRoles,
} from './manual.roles'

import type { Primitive } from '#types'

/**
 * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-autocomplete)
 */

class RoleAttribute extends AriaAttribute {
	static readonly attributeName: string = 'role'
	static readonly propertyName: string = 'role'
	static readonly validValues = roles

	get name() {
		return RoleAttribute.attributeName
	}

	get category() {
		if (compositeRoles.includes(<CompositeRole>this.value)) {
			return AriaCategory.Composite
		} else if (landmarkRoles.includes(<LandmarkRole>this.value)) {
			return AriaCategory.Landmark
		} else if (regionRoles.includes(<RegionRole>this.value)) {
			return AriaCategory.Region
		} else if (structureRoles.includes(<StructureRole>this.value)) {
			return AriaCategory.Structure
		} else if (widgetRoles.includes(<WidgetRole>this.value)) {
			return AriaCategory.Widget
		} else if (windowRoles.includes(<WindowRole>this.value)) {
			return AriaCategory.Window
		}
		return null
	}

	get property() {
		return RoleAttribute.propertyName
	}

	protected _parseValue(value: Primitive): RoleAttributeValue | never {
		if (typeof value === 'string') {
			for (const validRole of RoleAttribute.validValues)
				if (validRole === value) return validRole
			throw new Error(`Wrong role: "${String(value)}"`)
		} else {
			throw new Error(
				`Wrong type of the attribute value: "${String(value)}"`,
			)
		}
	}
}

export type CompositeRole = (typeof compositeRoles)[number]
export type LandmarkRole = (typeof landmarkRoles)[number]
export type RegionRole = (typeof regionRoles)[number]
export type StructureRole = (typeof structureRoles)[number]
export type WidgetRole = (typeof widgetRoles)[number]
export type WindowRole = (typeof windowRoles)[number]
export type RoleAttributeValue = (typeof roles)[number]

export default RoleAttribute
