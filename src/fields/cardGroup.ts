import type { ArrayField } from 'payload';

// Reusable {title, description} card-repeater, used anywhere the old Sanity
// schema hardcoded a fixed count (mission1-3, why1-3, learn1-4). Editors can
// add/remove/reorder cards freely instead of being capped at a hardcoded number.
export function cardGroupField(
  name: string,
  overrides?: Partial<Pick<ArrayField, 'label' | 'minRows' | 'maxRows' | 'admin'>>
): ArrayField {
  return {
    name,
    type: 'array',
    labels: { singular: 'Card', plural: 'Cards' },
    fields: [
      {
        name: 'title',
        type: 'text',
        localized: true,
        required: true,
      },
      {
        name: 'description',
        type: 'textarea',
        localized: true,
      },
    ],
    ...overrides,
  };
}
