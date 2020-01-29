export default abstract class Event {
    public static readonly CONNECTION = "connection";
    public static readonly DISCONNECT = "disconnect";
    public static readonly CONNECT = 'connect';
    public static readonly UPDATE = 'update';
    public static readonly SET_USERNAME = 'set-username';
    public static readonly DRAW = 'draw';
    public static readonly DRAWING = 'drawing'
}