export default abstract class Config {
    public static readonly PORT = 9000;
    public static readonly MAX_PLAYER_NUMBER = 10;
    public static readonly UPDATE_INTERVAL = 50;
    public static readonly DRAWTIME = 30 * 1000 / Config.UPDATE_INTERVAL
}
