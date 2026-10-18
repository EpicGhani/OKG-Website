import type { GameBannerSettings } from '../../data/types'
import '../../styles/sections/game-banner-editor.css'

export function GameBannerEditor({value, onChange, order, onOrderChange, onChoose}: {
  value: GameBannerSettings
  onChange: (value: GameBannerSettings) => void
  order: number
  onOrderChange: (value: number) => void
  onChoose: (layer: 'background' | 'foreground') => void
}) {
  const update = <K extends keyof GameBannerSettings>(key: K, next: GameBannerSettings[K]) => onChange({...value,[key]:next})
  return <fieldset className="banner-editor">
    <legend>Homepage banner</legend>
    <p>The homepage shows the first three published, featured games. Lower positions appear first; matching positions sort by slug.</p>
    <div className="banner-editor__fields">
      <label>Position<input type="number" min="0" max="999" step="1" required value={order} onChange={event=>onOrderChange(event.target.valueAsNumber || 0)} /></label>
      <label>Color theme<select value={value.theme} onChange={event=>update('theme',event.target.value as GameBannerSettings['theme'])}>
        <option value="default">Studio green</option><option value="hearthleaf">Golden sign</option><option value="monster-girl">Rose & teal</option><option value="veridian">Indigo & sage</option>
      </select></label>
    </div>
    {(['background','foreground'] as const).map(layer=><div className="banner-editor__asset" key={layer}>
      <div><strong>{layer === 'background' ? 'Background layer' : 'Front layer'}</strong><p>{layer === 'background' ? 'Clipped inside the rounded banner.' : 'A transparent logo or character that rises above the banner.'}</p></div>
      {value[layer] && <img src={value[layer]} alt={`${layer} preview`} />}
      <button type="button" onClick={()=>onChoose(layer)}>{value[layer] ? 'Change image' : 'Choose image'}</button>
      {value[layer] && <button type="button" onClick={()=>onChange({...value,[layer]:'',[`${layer}_small`]:''})}>Remove</button>}
    </div>)}
    <label>Front layer placement<select value={value.foreground_layout} onChange={event=>update('foreground_layout',event.target.value as GameBannerSettings['foreground_layout'])}>
      <option value="character">Full character, with room above the banner</option><option value="logo">Wide logo near the top</option>
    </select></label>
    <label className="banner-editor__check"><input type="checkbox" checked={value.includes_title} onChange={event=>update('includes_title',event.target.checked)} />Front image already includes the game title</label>
    <label className="banner-editor__check"><input type="checkbox" checked={value.pixel_art} onChange={event=>update('pixel_art',event.target.checked)} />Keep pixel art crisp</label>
    <label>Banner title lines (up to four)<textarea rows={3} value={value.title_lines.join('\n')} onChange={event=>update('title_lines',event.target.value.split('\n').slice(0,4))} placeholder="Leave blank to use the game title" /></label>
    <label>Banner subtitle<input value={value.subtitle} onChange={event=>update('subtitle',event.target.value)} placeholder="Optional" /></label>
  </fieldset>
}
