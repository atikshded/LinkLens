const devices = [
  { name: "Desktop", value: 58 },
  { name: "Mobile", value: 34 },
  { name: "Tablet", value: 8 },
];

function DeviceCard() {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">

      <h2 className="text-xl font-semibold text-white">
        Devices
      </h2>

      <div className="mt-6 space-y-4">

        {devices.map((device) => (

          <div key={device.name} className="flex justify-between">

            <span className="text-slate-300">
              {device.name}
            </span>

            <span className="font-semibold text-white">
              {device.value}%
            </span>

          </div>

        ))}

      </div>

    </div>
  );
}

export default DeviceCard;