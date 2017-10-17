import { scale, default as typography } from "./typography"

test("typography values", function () {
  [ 0, 14, 33 ].forEach(function (size) {
    Object.keys(scale).forEach(function (scaleName) {
      const s = scale[scaleName]
      const t = typography({
        fontSize: size,
        fontSizeScale: scaleName,
        lineHeight: 1.5,
      })

      expect(t.fontSize(-3)).toBeCloseTo(size * s * s * s, 5)
      expect(t.fontSize(-2)).toBeCloseTo(size * s * s, 5)
      expect(t.fontSize(-1)).toBeCloseTo(size * s, 5)
      expect(t.fontSize(0)).toBeCloseTo(size, 5)
      expect(t.fontSize(1)).toBeCloseTo(size / s, 5)
      expect(t.fontSize(2)).toBeCloseTo(size / s / s, 5)
      expect(t.fontSize(3)).toBeCloseTo(size / s / s / s, 5)
    })
  })
})

test("typography fixtures (perfect fifth)", function () {
  const t = typography({
    fontSize: 1,
    fontSizeScale: 2 / 3,
    lineHeight: 1.5,
  })

  expect(t.fontSize(-3)).toBeCloseTo(0.296, 3)
  expect(t.fontSize(-2)).toBeCloseTo(0.444, 3)
  expect(t.fontSize(-1)).toBeCloseTo(0.667, 3)
  expect(t.fontSize(0)).toBe(1)
  expect(t.fontSize(1)).toBeCloseTo(1.5, 3)
  expect(t.fontSize(2)).toBeCloseTo(2.25, 3)
  expect(t.fontSize(3)).toBeCloseTo(3.375, 3)
})

test("typography fixtures (golden ratio)", function () {
  const t = typography({
    fontSize: 1,
    fontSizeScale: 1 / 1.618,
    lineHeight: 1.5,
  })

  expect(t.fontSize(-3)).toBeCloseTo(0.236, 3)
  expect(t.fontSize(-2)).toBeCloseTo(0.382, 3)
  expect(t.fontSize(-1)).toBeCloseTo(0.618, 3)
  expect(t.fontSize(0)).toBe(1)
  expect(t.fontSize(1)).toBeCloseTo(1.618, 3)
  expect(t.fontSize(2)).toBeCloseTo(2.618, 3)
  expect(t.fontSize(3)).toBeCloseTo(4.236, 3)
})
