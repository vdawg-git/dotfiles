{
  pkgs,
  lib,
  ...
}: {
  imports = [./hardware.nix];

  networking.hostName = "swordfish";

  # This LUKS volume contains the persistent swap partition used for hibernation.
  boot.initrd.luks.devices."luks-fa3f1ad7-d3d6-4abe-b3f5-e3f2781ffab3".device = "/dev/disk/by-uuid/fa3f1ad7-d3d6-4abe-b3f5-e3f2781ffab3";

  swapDevices = lib.mkForce [
    {device = "/dev/mapper/luks-fa3f1ad7-d3d6-4abe-b3f5-e3f2781ffab3";}
  ];
  boot.resumeDevice = "/dev/mapper/luks-fa3f1ad7-d3d6-4abe-b3f5-e3f2781ffab3";
  environment.systemPackages = with pkgs; [
  ];
}
