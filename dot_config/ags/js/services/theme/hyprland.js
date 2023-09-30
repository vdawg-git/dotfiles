const { App } = ags;
const { Hyprland } = ags.Service;
const { execAsync } = ags.Utils;

export default function({
    wm_gaps,
    bar_style,
    layout,
}) {
    try {
        App.instance.connect('config-parsed', () => {
            for (const [name] of App.windows) {
                if (!name.includes('desktop') && name !== 'verification' && name !== 'powermenu') {
                    execAsync(['hyprctl', 'keyword', 'layerrule', `unset, ${name}`]).then(() => {
                        execAsync(['hyprctl', 'keyword', 'layerrule', `blur, ${name}`]);
                        execAsync(['hyprctl', 'keyword', 'layerrule', `ignorealpha 0.6, ${name}`]);
                    });
                }
            }

            for (const name of ['verification', 'powermenu'])
                execAsync(['hyprctl', 'keyword', 'layerrule', `blur, ${name}`]);
        });


        Hyprland.HyprctlGet('monitors').forEach(({ name }) => {
            if (bar_style !== 'normal') {
                switch (layout) {
                    case 'topbar':
                    case 'unity':
                        execAsync(`hyprctl keyword monitor ${name},addreserved,-${wm_gaps},0,0,0`);
                        break;

                    case 'bottombar':
                        execAsync(`hyprctl keyword monitor ${name},addreserved,0,-${wm_gaps},0,0`);
                        break;

                    default: break;
                }
            } else {
                execAsync(`hyprctl keyword monitor ${name},addreserved,0,0,0,0`);
            }
        });
    } catch (error) {
        logError(error);
    }
}
