export function get_temporal_oscillation(period:number,current_elapsed_time:number):number
{
    return (current_elapsed_time%period)/period;
}