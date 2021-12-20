
async function EasyPlayer(opt) {
    const WasmPlayer = (await import('@easydarwin/easywasmplayer')).default
    return new WasmPlayer(null, opt.id, (e) => {
        console.log(opt.id, "_player", e)
        if (e && e.code === 404) {
            //console.log()
        }
    }, { ...opt });
}
export default EasyPlayer;