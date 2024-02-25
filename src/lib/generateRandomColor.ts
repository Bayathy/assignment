/**
 * グラフの色をランダムに生成する関数
 * @description ランダムなHSL形式の色を生成する
 * @returns {string} HSL形式の色
 */

export function generateRandomColor() {
  const randomHue = Math.floor(Math.random() * 360) // 色相をランダムに選択

  // 鮮やかで見やすい色を生成するため、彩度と明度は固定
  const saturation = 70
  const lightness = 50

  // HSL形式で色を返す
  return `hsl(${randomHue}, ${saturation}%, ${lightness}%)`
}
