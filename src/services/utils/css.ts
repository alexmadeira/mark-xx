export class Css {
  private static checkDocument() {
    if (typeof document === 'undefined' || document.documentElement === null) {
      throw new Error('Document not available')
    }
  }

  public static findVar(cssVariable: string, defaultValue?: string | number) {
    this.checkDocument()

    const variableValue = getComputedStyle(document.documentElement).getPropertyValue(cssVariable.trim())

    return variableValue || defaultValue || ''
  }

  public static findCorVar(cssVariable: string, defaultValue?: string) {
    return this.findVar(cssVariable, defaultValue).toString()
  }

  public static setVar(cssVariable: string, value: string | number) {
    this.checkDocument()

    document.documentElement.style.setProperty(cssVariable.trim(), String(value))
  }

  public static makeVar(key: string, value: string | number) {
    return [`--${key}`, value]
  }

  public static makeVars(variables: Record<string, string | number>) {
    const cssVars: Record<string, string | number> = {}

    Object.entries(variables).forEach(([key, value]) => {
      const [varKey, varValue] = this.makeVar(key, value)

      cssVars[varKey] = varValue
    })

    return cssVars
  }

  public static setVars(variables: Record<string, string | number>) {
    const cssVariables = this.makeVars(variables)

    Object.entries(cssVariables).forEach(([key, value]) => {
      this.setVar(key, value)
    })
  }

  public static makeColorVar(name: string, value: string) {
    return [`--${name}-color`, value]
  }

  public static makeColorVars(variables: Record<string, string>) {
    const cssVars: Record<string, string> = {}

    Object.entries(variables).forEach(([name, value]) => {
      const [varKey, varValue] = this.makeColorVar(name, value)

      cssVars[varKey] = varValue
    })

    return cssVars
  }

  public static setColorVars(variables: Record<string, string>) {
    const cssVariables = this.makeColorVars(variables)

    Object.entries(cssVariables).forEach(([key, value]) => {
      this.setVar(key, value)
    })
  }
}
