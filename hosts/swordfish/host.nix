{
  pkgs,
  lib,
  ...
}: {
  imports = [./hardware.nix];

  networking.hostName = "swordfish";

  boot.initrd.luks.devices."luks-fa3f1ad7-d3d6-4abe-b3f5-e3f2781ffab3".device = "/dev/disk/by-uuid/fa3f1ad7-d3d6-4abe-b3f5-e3f2781ffab3";
  swapDevices = lib.mkForce [
    {device = "/dev/disk/by-uuid/795c1cf1-6107-41d6-8bc3-f064db351809";}
  ];

  environment.systemPackages = with pkgs; [
  ];
}
