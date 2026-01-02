import type { TPrismicDocument } from '@/prismic'

import _ from 'lodash'

/**
 * Utility helpers for working with Prismic documents.
 *
 * Currently focused on extracting document relationships
 * (`link_type === 'Document'`) while preserving the semantic
 * field keys defined by the Prismic data structure.
 */
export class PrismicUtils {
  /**
   * Extracts all Prismic document relationship IDs from a document,
   * grouping them by their semantic field key.
   *
   * The semantic field key is determined by the field that *contains*
   * the array or object structure where the relationship appears,
   * rather than intermediate wrapper keys.
   *
   * @param document - The Prismic document to be analyzed.
   * @returns An object where each key represents a semantic field name
   * and its value is an array of related Prismic document IDs.
   *
   * @example
   * ```ts
   * {
   *   technologies: ["id1", "id2"],
   *   authors: ["id3"]
   * }
   * ```
   */
  public static relationshipKeys(document: TPrismicDocument) {
    const map = new Map<string, Set<string>>()

    PrismicUtils.deepSearch(document.data, map)

    return Object.fromEntries([...map.entries()].map(([key, ids]) => [key, [...ids]]))
  }

  /**
   * Recursively traverses an unknown Prismic data structure to locate
   * document relationships (`link_type === 'Document'`).
   *
   * When a relationship is found, its ID is associated with the
   * current semantic field key. This key is preserved across nested
   * objects and arrays to avoid losing contextual meaning caused by
   * structural wrappers.
   *
   * @param value - The current value being traversed (object, array, or primitive).
   * @param map - A map used to accumulate relationship IDs grouped by field key.
   * @param fieldKey - The semantic field key that owns the current traversal context.
   */
  protected static deepSearch(value: Record<string, unknown>, map: Map<string, Set<string>>, fieldKey?: string): void {
    if (_.isNil(value)) return
    if (_.isPlainObject(value) && value.link_type === 'Document' && fieldKey && _.isString(value?.id)) {
      if (!map.has(fieldKey)) map.set(fieldKey, new Set())
      map.get(fieldKey)!.add(value.id)
      return
    }
    if (_.isArray(value)) return value.forEach((item) => PrismicUtils.deepSearch(item, map, fieldKey))
    if (_.isPlainObject(value)) {
      _.forOwn(value, (childValue, key) => {
        PrismicUtils.deepSearch(childValue as Record<string, unknown>, map, fieldKey ?? key)
      })
    }
  }
}
